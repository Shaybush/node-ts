import { ChangeStreamInsertDocument, ChangeStreamUpdateDocument, ChangeStreamDeleteDocument, ChangeStreamReplaceDocument } from 'mongodb';
import { MongoDBConnection } from './mongodb';

export async function watchUserLifecycleEvents() {
    const db = MongoDBConnection.getInstance().getDb();
    if (!db) {
        console.error('[MongoDB] Database connection failed. Change stream not started.');
        return;
    }
    const collection = db.collection('users');

    // Enable pre/post images in MongoDB shell if not already:
    // db.runCommand({ collMod: "users", changeStreamPreAndPostImages: { enabled: true } })

    const changeStream = collection.watch([], {
        fullDocument: 'updateLookup',
        fullDocumentBeforeChange: 'whenAvailable',
    });

    changeStream.on('change', (change) => {
        switch (change.operationType) {
            case 'insert':
                console.log(`[MongoDB] User inserted:`, change.fullDocument);
                break;
            case 'update':
                console.log(`[MongoDB] User updated. Before:`, change.fullDocumentBeforeChange, 'After:', change.fullDocument);
                break;
            case 'replace':
                console.log(`[MongoDB] User replaced. Before:`, change.fullDocumentBeforeChange, 'After:', change.fullDocument);
                break;
            case 'delete':
                console.log(`[MongoDB] User deleted. Before:`, change.fullDocumentBeforeChange);
                break;
            case 'invalidate':
                console.log(`[MongoDB] Change stream invalidated.`);
                break;
            default:
                console.log(`[MongoDB] Other change:`, change);
        }
    });

    changeStream.on('error', (err) => {
        console.error('[MongoDB] Change stream error:', err);
    });

    console.log('[MongoDB] User lifecycle change stream started.');
} 