class ExportsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postExportNotesHandler = this.postExportNotesHandler.bind(this);
  }

  async postExportNotesHandler(request, h) {
    this._validator.validateExportNotesPayload(request.payload);

    const message = {
      userId: request.auth.credentials.id, // mendapatkan user id dari credentials
      targetEmail: request.payload.targetEmail, // mendapatkan targetEmail dari payload
    };

    await this._service.sendMessage("export:notes", JSON.stringify(message));

    const response = h.response({
        status: 'success',
        message: 'Permintaan Anda dalam antrean',
      });
      response.code(201);
      return response;
  }
}

module.exports = ExportsHandler;