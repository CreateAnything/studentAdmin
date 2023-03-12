const adminModules = import.meta.glob('../views/admin/**/*.vue');
const teacherModules = import.meta.glob('../views/teacher/**/*.vue');
const studentModules = import.meta.glob('../views/student/**/*.vue');

import { Role, RoutesModulesType } from '@/store/type/user.type';
export const findMoudlesByRole = (roleName: number) => {
	const RoutesModulesView: RoutesModulesType = {
		type: '',
		modules: {},
	};
	switch (roleName) {
		case Role.admin:
			RoutesModulesView.modules = adminModules;
			RoutesModulesView.type = 'admin';
			break;
		case Role.teacher:
			RoutesModulesView.modules = teacherModules;
			RoutesModulesView.type = 'teacher';
			break;
		case Role.student:
			RoutesModulesView.modules = studentModules;
			RoutesModulesView.type = 'student';
			break;
	}
	return RoutesModulesView;
};
