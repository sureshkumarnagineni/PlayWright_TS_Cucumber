import * as fs from 'fs';
import * as path from 'path';

export class FileUtils {
    /**
     * Reads values from testData.properties manually to bypass library errors
     */
    static getProperty(key: string): string {
        try {
            const filePath = path.join(process.cwd(), 'testData.properties');
            
            // Read the file as raw text
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const lines = fileContent.split(/\r?\n/);
            
            for (const line of lines) {
                // Skip comments and empty lines
                if (line.trim().startsWith('#') || line.trim() === '') continue;

                const [propKey, ...propValueParts] = line.split('=');
                const propValue = propValueParts.join('=');

                if (propKey && propKey.trim().toLowerCase() === key.toLowerCase()) {
                    return propValue.trim();
                }
            }

            throw new Error(`Property key "${key}" not found in testData.properties`);
        } catch (error: any) {
            throw new Error(`FileUtils Error: ${error.message}`);
        }
    }
}