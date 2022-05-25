import {inject} from '@loopback/core';
import {
  post,
  Request,
  requestBody,
  Response,
  RestBindings,
} from '@loopback/rest';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {FILE_UPLOAD_SERVICE} from '../keys';
import {FileUploadHandler} from '../types';
import {PaqueteRepository} from '../repositories';
const csv = require('csv-parser');
const fs = require('fs');
/**
 * A controller to handle file uploads using multipart/form-data media type
 */
export class FileUploadController {
	  constructor( @repository(PaqueteRepository)
    public paqueteRepository : PaqueteRepository,
    @inject(FILE_UPLOAD_SERVICE) private handler: FileUploadHandler,
  ) {}
  @post('/files', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Files and fields',
      },
    },
  })
  async fileUpload(
    
  ): Promise<void> {
    fs.createReadStream("./CSV/Paquetes.csv").pipe(csv())
          .on('data', row => {this.paqueteRepository.create(row)
		  });
  }
    private static getFilesAndFields(request: Request) {
    const uploadedFiles = request.files;
    const mapper = (f: globalThis.Express.Multer.File) => ({
      fieldname: f.fieldname,
      originalname: f.originalname,
      encoding: f.encoding,
      mimetype: f.mimetype,
      size: f.size,
    });
    let files: object[] = [];
    if (Array.isArray(uploadedFiles)) {
      files = uploadedFiles.map(mapper);
    } else {
      for (const filename in uploadedFiles) {
        files.push(...uploadedFiles[filename].map(mapper));
      }
    }
		console.log(request);
    return {files, fields: request.body};

  }
}