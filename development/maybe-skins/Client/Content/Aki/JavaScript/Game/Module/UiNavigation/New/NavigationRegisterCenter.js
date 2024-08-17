"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NavigationRegisterCenter = void 0);
const BasePanelHandle_1 = require("./PanelHandle/BasePanelHandle"),
	FunctionViewPanelHandle_1 = require("./PanelHandle/FunctionViewPanelHandle"),
	InventoryViewPanelHandle_1 = require("./PanelHandle/InventoryViewPanelHandle"),
	NavigationPanelHandleCreator_1 = require("./PanelHandle/NavigationPanelHandleCreator"),
	RoleResonancePanelHandle_1 = require("./PanelHandle/RoleResonancePanelHandle"),
	RoleSkillPanelHandle_1 = require("./PanelHandle/RoleSkillPanelHandle"),
	RouletteViewPanelHandle_1 = require("./PanelHandle/RouletteViewPanelHandle"),
	VisionChooseMainPanelHandle_1 = require("./PanelHandle/VisionChooseMainPanelHandle"),
	NavigationFunctionPageButton_1 = require("./Selectable/FunctionView/NavigationFunctionPageButton"),
	NavigationFunctionPageLeftButton_1 = require("./Selectable/FunctionView/NavigationFunctionPageLeftButton"),
	NavigationFunctionPageRightButton_1 = require("./Selectable/FunctionView/NavigationFunctionPageRightButton"),
	NavigationInventoryDestroyEnterButton_1 = require("./Selectable/InventoryView/NavigationInventoryDestroyEnterButton"),
	NavigationInventoryDestroyExitButton_1 = require("./Selectable/InventoryView/NavigationInventoryDestroyExitButton"),
	NavigationInventoryItemGridToggle_1 = require("./Selectable/InventoryView/NavigationInventoryItemGridToggle"),
	NavigationButton_1 = require("./Selectable/NavigationButton"),
	NavigationDragComponent_1 = require("./Selectable/NavigationDragComponent"),
	NavigationScrollbar_1 = require("./Selectable/NavigationScrollbar"),
	NavigationSelectable_1 = require("./Selectable/NavigationSelectable"),
	NavigationSelectableCreator_1 = require("./Selectable/NavigationSelectableCreator"),
	NavigationSlider_1 = require("./Selectable/NavigationSlider"),
	NavigationToggle_1 = require("./Selectable/NavigationToggle"),
	NavigationRoguelikeGridToggle_1 = require("./Selectable/Roguelike/NavigationRoguelikeGridToggle"),
	NavigationRoleResonanceExitButton_1 = require("./Selectable/RoleRootView/Resonance/NavigationRoleResonanceExitButton"),
	NavigationRoleResonanceToggle_1 = require("./Selectable/RoleRootView/Resonance/NavigationRoleResonanceToggle"),
	NavigationRoleSkillTreeExitButton_1 = require("./Selectable/RoleRootView/Skill/NavigationRoleSkillTreeExitButton"),
	NavigationRoleSkillTreeToggle_1 = require("./Selectable/RoleRootView/Skill/NavigationRoleSkillTreeToggle"),
	NavigationRouletteExitButton_1 = require("./Selectable/Roulette/NavigationRouletteExitButton"),
	NavigationVisionTabViewReplaceButton_1 = require("./Selectable/Vision/NavigationVisionTabViewReplaceButton"),
	NavigationVisionTabViewToggle_1 = require("./Selectable/Vision/NavigationVisionTabViewToggle"),
	NavigationVisionToggle_1 = require("./Selectable/Vision/NavigationVisionToggle"),
	selectableCtorMap = {
		Button: NavigationButton_1.NavigationButton,
		Toggle: NavigationToggle_1.NavigationToggle,
		Scrollbar: NavigationScrollbar_1.NavigationScrollbar,
		Slider: NavigationSlider_1.NavigationSlider,
		DragComponent: NavigationDragComponent_1.NavigationDragComponent,
		Selectable: NavigationSelectable_1.NavigationSelectable,
		VisionReplaceViewToggle: NavigationVisionToggle_1.NavigationVisionToggle,
		VisionTabViewToggle:
			NavigationVisionTabViewToggle_1.NavigationVisionTabViewToggle,
		VisionTabViewReplaceButton:
			NavigationVisionTabViewReplaceButton_1.NavigationVisionTabViewReplaceButton,
		FunctionPageButton:
			NavigationFunctionPageButton_1.NavigationFunctionPageButton,
		FunctionPageLeftButton:
			NavigationFunctionPageLeftButton_1.NavigationFunctionPageLeftButton,
		FunctionPageRightButton:
			NavigationFunctionPageRightButton_1.NavigationFunctionPageRightButton,
		RoleSkillTreeToggle:
			NavigationRoleSkillTreeToggle_1.NavigationRoleSkillTreeToggle,
		RoleSkillTreeExitButton:
			NavigationRoleSkillTreeExitButton_1.NavigationRoleSkillTreeExitButton,
		RoleResonanceToggle:
			NavigationRoleResonanceToggle_1.NavigationRoleResonanceToggle,
		RoleResonanceExitButton:
			NavigationRoleResonanceExitButton_1.NavigationRoleResonanceExitButton,
		InventoryDestroyEnterButton:
			NavigationInventoryDestroyEnterButton_1.NavigationInventoryDestroyEnterButton,
		InventoryDestroyExitButton:
			NavigationInventoryDestroyExitButton_1.NavigationInventoryDestroyExitButton,
		InventoryItemGridToggle:
			NavigationInventoryItemGridToggle_1.NavigationInventoryItemGridToggle,
		RouletteExitButton:
			NavigationRouletteExitButton_1.NavigationRouletteExitButton,
		RoguelikeGridToggle:
			NavigationRoguelikeGridToggle_1.NavigationRoguelikeGridToggle,
	},
	panelHandleCtorMap = {
		Default: BasePanelHandle_1.BasePanelHandle,
		VisionChooseMain: VisionChooseMainPanelHandle_1.VisionChooseMainPanelHandle,
		MainMenu: FunctionViewPanelHandle_1.FunctionViewPanelHandle,
		RoleSkill: RoleSkillPanelHandle_1.RoleSkillPanelHandle,
		RoleResonance: RoleResonancePanelHandle_1.RoleResonancePanelHandle,
		Inventory: InventoryViewPanelHandle_1.InventoryViewPanelHandle,
		Roulette: RouletteViewPanelHandle_1.RouletteViewPanelHandle,
	};
class NavigationRegisterCenter {
	static Init() {
		this.Wxo(), this.Kxo();
	}
	static Wxo() {
		for (const n in selectableCtorMap) {
			var e = n;
			NavigationSelectableCreator_1.NavigationSelectableCreator.RegisterNavigationBehavior(
				e,
				selectableCtorMap[e],
			);
		}
	}
	static Kxo() {
		for (const n in panelHandleCtorMap) {
			var e = n;
			NavigationPanelHandleCreator_1.NavigationPanelHandleCreator.RegisterSpecialPanelHandle(
				e,
				panelHandleCtorMap[e],
			);
		}
	}
}
exports.NavigationRegisterCenter = NavigationRegisterCenter;
