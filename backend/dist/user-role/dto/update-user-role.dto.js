"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserRoleDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_role_dto_1 = require("./create-user-role.dto");
class UpdateUserRoleDto extends (0, mapped_types_1.PartialType)(create_user_role_dto_1.CreateUserRoleDto) {
}
exports.UpdateUserRoleDto = UpdateUserRoleDto;
//# sourceMappingURL=update-user-role.dto.js.map