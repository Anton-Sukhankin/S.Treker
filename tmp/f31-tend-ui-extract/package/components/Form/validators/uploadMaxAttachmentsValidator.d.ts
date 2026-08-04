import { FormValidator } from '../types';
export type CreateUploadMaxAttachmentsValidatorParameters = {
    max?: number;
};
export declare const createUploadMaxAttachmentsValidator: (options?: CreateUploadMaxAttachmentsValidatorParameters) => FormValidator;
