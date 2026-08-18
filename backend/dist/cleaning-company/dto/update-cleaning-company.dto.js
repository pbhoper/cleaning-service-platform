"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCleaningCompanyDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_cleaning_company_dto_1 = require("./create-cleaning-company.dto");
class UpdateCleaningCompanyDto extends (0, mapped_types_1.PartialType)(create_cleaning_company_dto_1.CreateCleaningCompanyDto) {
}
exports.UpdateCleaningCompanyDto = UpdateCleaningCompanyDto;
//# sourceMappingURL=update-cleaning-company.dto.js.map