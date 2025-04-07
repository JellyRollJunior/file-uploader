import dotenv from 'dotenv';
import { decode } from 'base64-arraybuffer';
import { createClient } from '@supabase/supabase-js'
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const uploadFileToSupabase = async (uuid, extension, buffer) => {
    const fileBase64 = decode(buffer.toString("base64"));
    const {data, error} = await supabase
        .storage
        .from('files')
        .upload(`/${uuid}.${extension}`, fileBase64, {
            cacheControl: 3600,
            upsert: false
        });
    console.log(data);
    console.log(error);
}

export { uploadFileToSupabase }