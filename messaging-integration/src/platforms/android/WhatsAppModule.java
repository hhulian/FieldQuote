package com.fieldquote.messaging;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Environment;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.content.FileProvider;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * Android Native Module for WhatsApp Integration
 * Provides methods for checking WhatsApp availability and sharing content
 */
public class WhatsAppModule extends ReactContextBaseJavaModule {
    private static final String TAG = "WhatsAppModule";
    private final ReactApplicationContext reactContext;

    public WhatsAppModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "WhatsAppModule";
    }

    /**
     * Check if WhatsApp is installed on the device
     *
     * @param promise Promise to resolve with boolean result
     */
    @ReactMethod
    public void isWhatsAppInstalled(Promise promise) {
        try {
            PackageManager pm = reactContext.getPackageManager();
            pm.getPackageInfo("com.whatsapp", PackageManager.GET_ACTIVITIES);
            promise.resolve(true);
        } catch (PackageManager.NameNotFoundException e) {
            promise.resolve(false);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    /**
     * Share text message via WhatsApp
     *
     * @param phone   Recipient phone number (optional)
     * @param message Message to share
     * @param promise Promise to resolve with success status
     */
    @ReactMethod
    public void shareTextViaWhatsApp(String phone, String message, Promise promise) {
        try {
            Intent intent = new Intent(Intent.ACTION_SEND);
            intent.setType("text/plain");
            intent.setPackage("com.whatsapp");
            intent.putExtra(Intent.EXTRA_TEXT, message);

            // If phone number is provided, use direct chat
            if (phone != null && !phone.isEmpty()) {
                // Format phone number (remove non-digits)
                phone = phone.replaceAll("[^0-9]", "");
                
                // Create WhatsApp direct chat intent
                Uri uri = Uri.parse("https://wa.me/" + phone + "?text=" + Uri.encode(message));
                Intent directIntent = new Intent(Intent.ACTION_VIEW, uri);
                
                if (directIntent.resolveActivity(reactContext.getPackageManager()) != null) {
                    directIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    reactContext.startActivity(directIntent);
                    promise.resolve(true);
                    return;
                }
            }

            // Fall back to general share if direct chat doesn't work
            if (intent.resolveActivity(reactContext.getPackageManager()) != null) {
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                reactContext.startActivity(intent);
                promise.resolve(true);
            } else {
                promise.resolve(false);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error sharing via WhatsApp", e);
            promise.reject("ERROR", e.getMessage());
        }
    }

    /**
     * Share a file via WhatsApp
     *
     * @param filePath Path to the file to share
     * @param fileType MIME type of the file
     * @param message  Optional message to include with the file
     * @param promise  Promise to resolve with success status
     */
    @ReactMethod
    public void shareFileViaWhatsApp(String filePath, String fileType, String message, Promise promise) {
        try {
            File file = new File(filePath);
            if (!file.exists()) {
                promise.reject("FILE_NOT_FOUND", "The specified file does not exist");
                return;
            }

            // Get URI for the file using FileProvider
            String authority = reactContext.getPackageName() + ".fileprovider";
            Uri contentUri = FileProvider.getUriForFile(reactContext, authority, file);

            Intent intent = new Intent(Intent.ACTION_SEND);
            intent.setType(fileType);
            intent.setPackage("com.whatsapp");
            intent.putExtra(Intent.EXTRA_STREAM, contentUri);
            
            // Add message if provided
            if (message != null && !message.isEmpty()) {
                intent.putExtra(Intent.EXTRA_TEXT, message);
            }
            
            // Grant read permission to WhatsApp
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

            if (intent.resolveActivity(reactContext.getPackageManager()) != null) {
                reactContext.startActivity(intent);
                promise.resolve(true);
            } else {
                promise.resolve(false);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error sharing file via WhatsApp", e);
            promise.reject("ERROR", e.getMessage());
        }
    }

    /**
     * Create a temporary file from text content
     *
     * @param content  Text content to write to file
     * @param fileName Name for the temporary file
     * @param promise  Promise to resolve with file path
     */
    @ReactMethod
    public void createTemporaryFile(String content, String fileName, Promise promise) {
        try {
            File outputDir = reactContext.getCacheDir();
            File outputFile = new File(outputDir, fileName);

            FileOutputStream fos = new FileOutputStream(outputFile);
            fos.write(content.getBytes());
            fos.close();

            promise.resolve(outputFile.getAbsolutePath());
        } catch (IOException e) {
            Log.e(TAG, "Error creating temporary file", e);
            promise.reject("ERROR", e.getMessage());
        }
    }
}
