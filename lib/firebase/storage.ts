"use client";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
  type UploadTask,
} from "firebase/storage";

import { storage } from "./client";

export type UploadResult = { url: string; path: string };

export function uploadFile(
  path: string,
  file: File,
  onProgress?: (pct: number) => void,
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const fullPath = `${path}/${Date.now()}-${file.name.replace(/[^\w.\-]/g, "_")}`;
    const storageRef = ref(storage(), fullPath);
    const task: UploadTask = uploadBytesResumable(storageRef, file);

    task.on(
      "state_changed",
      (snap) => {
        const pct = (snap.bytesTransferred / snap.totalBytes) * 100;
        onProgress?.(pct);
      },
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve({ url, path: fullPath });
      },
    );
  });
}

export async function deleteFile(path: string) {
  await deleteObject(ref(storage(), path));
}
