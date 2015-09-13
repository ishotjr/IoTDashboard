module.exports = {
	setModuleToLoaded: function($module) {
		if(!$module.hasClass('loaded')) $module.addClass('loaded');
	}
}