import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { IMediaResponse } from './media.interfase' // Import the necessary functions

@Injectable()
export class MediaService {
	async saveMedia(
		mediaFile: Express.Multer.File,
		folder = 'default',
	): Promise<IMediaResponse> {
		const uploadsFolder = `${path}/uploads/${folder}`; // Correct the path to include a slash (/)
		await ensureDir(uploadsFolder);

		await writeFile(
			`${uploadsFolder}/${mediaFile.originalname}`,
			mediaFile.buffer,
		);

		return {
			url: `/uploads/${folder}/${mediaFile.originalname}`, // Correct the URL path to include a slash (/)
			name: mediaFile.originalname,
		};
	}
}
