import { allowedFileTypes } from "../../features/enum/allowed-file-types.list";


export function validateFileSize(file: File | null): boolean {

  if (!file){
    return true;
  }

  const maxSizeInBytes = 20 * 1024 * 1024;

  return file.size <= maxSizeInBytes; 
}

export function validateFileType(file: File | null): boolean {
  if (!file){
    return true;
  }

  return allowedFileTypes.includes(file.type); 
}