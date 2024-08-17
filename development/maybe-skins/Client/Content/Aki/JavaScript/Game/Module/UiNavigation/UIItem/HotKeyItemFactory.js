"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HotKeyItemFactory = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	BackComponent_1 = require("../UIComponent/BackComponent"),
	BagTagNavigationNextComponent_1 = require("../UIComponent/BagTagNavigationNextComponent"),
	BattleViewCameraComponent_1 = require("../UIComponent/BattleViewCameraComponent"),
	ClickBtnComponent_1 = require("../UIComponent/ClickBtnComponent"),
	ClickBtnInsideComponent_1 = require("../UIComponent/ClickBtnInsideComponent"),
	ClickBtnInsideReleaseComponent_1 = require("../UIComponent/ClickBtnInsideReleaseComponent"),
	ClickBtnReleaseComponent_1 = require("../UIComponent/ClickBtnReleaseComponent"),
	DraggableComponent_1 = require("../UIComponent/DraggableComponent"),
	DraggableInsideComponent_1 = require("../UIComponent/DraggableInsideComponent"),
	FollowItemComponent_1 = require("../UIComponent/FollowItemComponent"),
	InteractComponent_1 = require("../UIComponent/InteractComponent"),
	InteractReleaseComponent_1 = require("../UIComponent/InteractReleaseComponent"),
	InteractWheelComponent_1 = require("../UIComponent/InteractWheelComponent"),
	LongPressComponent_1 = require("../UIComponent/LongPressComponent"),
	LongPressInsideComponent_1 = require("../UIComponent/LongPressInsideComponent"),
	LongTimeToTriggerComponent_1 = require("../UIComponent/LongTimeToTriggerComponent"),
	MapInteractComponent_1 = require("../UIComponent/MapInteractComponent"),
	MarkBookComponent_1 = require("../UIComponent/MarkBookComponent"),
	MaskComponent_1 = require("../UIComponent/MaskComponent"),
	NavigationGroupComponent_1 = require("../UIComponent/NavigationGroupComponent"),
	RoleInteractComponent_1 = require("../UIComponent/RoleInteractComponent"),
	RouletteNavigationComponent_1 = require("../UIComponent/RouletteNavigationComponent"),
	ScrollBarComponent_1 = require("../UIComponent/ScrollBarComponent"),
	ScrollBarInsideComponent_1 = require("../UIComponent/ScrollBarInsideComponent"),
	ScrollSwitchComponent_1 = require("../UIComponent/ScrollSwitchComponent"),
	ShowOnlyComponent_1 = require("../UIComponent/ShowOnlyComponent"),
	SliderComponent_1 = require("../UIComponent/SliderComponent"),
	SliderInsideComponent_1 = require("../UIComponent/SliderInsideComponent"),
	TextInputComponent_1 = require("../UIComponent/TextInputComponent"),
	TextInputInsideComponent_1 = require("../UIComponent/TextInputInsideComponent"),
	MultipleHotKeyItem_1 = require("./MultipleHotKeyItem"),
	SingleHotKeyItem_1 = require("./SingleHotKeyItem");
class HotKeyItemFactory {
	static async CreateHotKeyItem(e, o, n) {
		switch (o) {
			case "SingleHotKey":
				return HotKeyItemFactory.Bqe(e, SingleHotKeyItem_1.SingleHotKeyItem, n);
			case "MultipleHotKey":
				return HotKeyItemFactory.Bqe(
					e,
					MultipleHotKeyItem_1.MultipleHotKeyItem,
					n,
				);
			default:
				return void (
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiNavigation",
						11,
						"导航快捷键的参数配置错误!",
						["Mode", o],
						["index", n],
					)
				);
		}
	}
	static async Bqe(e, o, n) {
		return (o = new o()), await o.CreateThenShowByActorAsync(e, n), o;
	}
	static async CreateHotKeyComponent(e, o, n) {
		var t =
			ConfigManager_1.ConfigManager.UiNavigationConfig.GetHotKeyMapConfig(o);
		if (t) {
			var r = this.wbo.get(t.Type);
			if (r)
				return (
					(r = this.Bbo(r, o)).SetHotKeyFunctionType(t.Type),
					await r.CreateThenShowByActorAsync(e),
					r.SetHotKeyType(n),
					r.InitHotKeyLogicMode(),
					r
				);
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"UiNavigation",
					11,
					"热键组件类型不存在!代码未进行注册",
					["type", t.Type],
				);
		} else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("UiNavigation", 11, "导航组中单个配置找不到", [
					"hotKeyMapId",
					o,
				]);
	}
	static Bbo(e, o) {
		return new e(o);
	}
}
(exports.HotKeyItemFactory = HotKeyItemFactory).wbo = new Map([
	["MarkBookNext", MarkBookComponent_1.MarkBookNextComponent],
	["MarkBookPrev", MarkBookComponent_1.MarkBookPrevComponent],
	["NavigationNext", NavigationGroupComponent_1.NavigationGroupNextComponent],
	["NavigationPrev", NavigationGroupComponent_1.NavigationGroupPrevComponent],
	[
		"NavigationInside",
		NavigationGroupComponent_1.NavigationGroupInsideComponent,
	],
	["Back", BackComponent_1.BackComponent],
	["Interact", InteractComponent_1.InteractComponent],
	["ClickButton", ClickBtnComponent_1.ClickBtnComponent],
	["ClickButtonInside", ClickBtnInsideComponent_1.ClickBtnInsideComponent],
	["ScrollBar", ScrollBarComponent_1.ScrollBarComponent],
	["ScrollBarInside", ScrollBarInsideComponent_1.ScrollBarInsideComponent],
	["ScrollSwitch", ScrollSwitchComponent_1.ScrollSwitchComponent],
	["InteractRelease", InteractReleaseComponent_1.InteractReleaseComponent],
	["ClickButtonRelease", ClickBtnReleaseComponent_1.ClickBtnReleaseComponent],
	[
		"ClickButtonInsideRelease",
		ClickBtnInsideReleaseComponent_1.ClickBtnInsideReleaseComponent,
	],
	["LongPress", LongPressComponent_1.LongPressComponent],
	["LongPressInside", LongPressInsideComponent_1.LongPressInsideComponent],
	["InteractWheel", InteractWheelComponent_1.InteractWheelComponent],
	["SliderIncrease", SliderComponent_1.SliderIncreaseComponent],
	["SliderReduce", SliderComponent_1.SliderReduceComponent],
	[
		"SliderIncreaseInside",
		SliderInsideComponent_1.SliderIncreaseInsideComponent,
	],
	["SliderReduceInside", SliderInsideComponent_1.SliderReduceInsideComponent],
	[
		"LongTimeToTrigger",
		LongTimeToTriggerComponent_1.LongTimeToTriggerComponent,
	],
	["TextInput", TextInputComponent_1.TextInputComponent],
	["TextInputInside", TextInputInsideComponent_1.TextInputInsideComponent],
	["DraggablePrev", DraggableComponent_1.DraggablePrevComponent],
	["DraggableNext", DraggableComponent_1.DraggableNextComponent],
	[
		"DraggablePrevInside",
		DraggableInsideComponent_1.DraggablePrevInsideComponent,
	],
	[
		"DraggableNextInside",
		DraggableInsideComponent_1.DraggableNextInsideComponent,
	],
	["Mask", MaskComponent_1.MaskComponent],
	["ShowOnly", ShowOnlyComponent_1.ShowOnlyComponent],
	["FollowItem", FollowItemComponent_1.FollowItemComponent],
	[
		"BagTagNavigationNext",
		BagTagNavigationNextComponent_1.BagTagNavigationNextComponent,
	],
	["BattleViewCamera", BattleViewCameraComponent_1.BattleViewCameraComponent],
	[
		"RouletteNavigation",
		RouletteNavigationComponent_1.RouletteNavigationComponent,
	],
	["MapCheck", MapInteractComponent_1.MapCheckComponent],
	["MapFocusPlayer", MapInteractComponent_1.MapFocusPlayerComponent],
	["MapMoveForward", MapInteractComponent_1.MapMoveForwardComponent],
	["MapMoveRight", MapInteractComponent_1.MapMoveRightComponent],
	["MapZoom", MapInteractComponent_1.MapZoomComponent],
	["RoleLookUp", RoleInteractComponent_1.RoleLookUpComponent],
	["RoleTurn", RoleInteractComponent_1.RoleTurnComponent],
	["RoleZoom", RoleInteractComponent_1.RoleZoomComponent],
	["RoleReset", RoleInteractComponent_1.RoleResetComponent],
]);
