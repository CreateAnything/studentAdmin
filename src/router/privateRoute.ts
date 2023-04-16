const adminModules = import.meta.glob('../views/admin/**/*.vue');
const teacherModules = import.meta.glob('../views/teacher/**/*.vue');
const studentModules = import.meta.glob('../views/student/**/*.vue');
import { RoutesModulesType } from '@/store/type/user.type';
import { Roels } from '@/views/admin/authority/user/type';
export const findMoudlesByRole = (roleName: Roels) => {
	const RoutesModulesView: RoutesModulesType = {
		type: '',
		modules: {},
	};
	switch (roleName) {
		case Roels.Admin:
			RoutesModulesView.modules = adminModules;
			RoutesModulesView.type = 'admin';
			break;
		case Roels.Teacher:
			RoutesModulesView.modules = teacherModules;
			RoutesModulesView.type = 'teacher';
			break;
		case Roels.Student:
			RoutesModulesView.modules = studentModules;
			RoutesModulesView.type = 'student';
			break;
	}
	return RoutesModulesView;
};
