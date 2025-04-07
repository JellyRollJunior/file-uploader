import dotenv from 'dotenv';
import { decode } from 'base64-arraybuffer';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const uploadFile = async (file) => {
    const uuid = uuidv4();
    const extension = file.originalname.split('.').pop();
    const fileBase64 = decode(file.buffer.toString('base64'));
    const { data, error } = await supabase.storage
        .from('files')
        .upload(`/${uuid}.${extension}`, fileBase64, {
            cacheControl: 3600,
            upsert: false,
        });
    if (error) {
        throw error;
    }
    console.log(data);
    return data.path;
};

const getFileDownloadUrl = (path) => {
    const { data, error } = supabase.storage
        .from('files')
        .getPublicUrl(path, { download: true });
    if (error) {
        throw error;
    }
    console.log(data);
    return data.publicUrl;
};

const getSrcUrl = (path) => {
    const { data, error } = supabase.storage
        .from('files')
        .getPublicUrl(path);
    if (error) {
        throw error;
    }
    console.log(data);
    return data.publicUrl;
};

export { uploadFile, getFileDownloadUrl, getSrcUrl };
