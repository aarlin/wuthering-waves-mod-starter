"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TsUiHotKeyActorComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	GlobalData_1 = require("../../GlobalData"),
	UiNavigationLogic_1 = require("./New/UiNavigationLogic"),
	HotKeyItemFactory_1 = require("./UIItem/HotKeyItemFactory"),
	UiNavigationUtil_1 = require("./UiNavigationUtil");
class TsUiHotKeyActorComponent extends UE.LGUIBehaviour {
	constructor() {
		super(...arguments),
			(this.Mode = ""),
			(this.Index = 0),
			(this.HotKeyItem = void 0),
			(this.PanelConfig = void 0),
			(this.UiHotKeyState = 0);
	}
	AwakeBP() {
		this.UiHotKeyState = 1;
	}
	StartBP() {
		GlobalData_1.GlobalData?.GameInstance &&
			(this.Index <= 0
				? Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"UiNavigation",
						11,
						"当前配置的热键id是无效的,无法执行TsUiHotKeyActorComponent逻辑",
						[
							"Path",
							UiNavigationUtil_1.UiNavigationUtil.GetFullPathOfActor(
								this.RootUIComp.GetOwner(),
							),
						],
						["Index", this.Index],
					)
				: this.Start());
	}
	async Start() {
		await this.RegisterHotKeyItem();
	}
	OnEnableBP() {
		this.HotKeyItem && this.RegisterAllHotKeyComponent();
	}
	OnDisableBP() {
		this.HotKeyItem && this.UnRegisterAllHotKeyComponent();
	}
	OnDestroyBP() {
		this.UnRegisterHotKeyItem(), (this.UiHotKeyState = 6);
	}
	async RegisterHotKeyItem() {
		(this.UiHotKeyState = 2),
			(this.HotKeyItem =
				await HotKeyItemFactory_1.HotKeyItemFactory.CreateHotKeyItem(
					this.GetOwner(),
					this.Mode,
					this.Index,
				)),
			(this.UiHotKeyState = 3),
			this.HotKeyItem &&
				(this.RegisterAllHotKeyComponent(),
				(this.PanelConfig =
					UiNavigationLogic_1.UiNavigationLogic.FindUiNavigationPanelConfig(
						this.GetOwner(),
					)),
				this.PanelConfig) &&
				this.PanelConfig.AddHotKeyItem(this.HotKeyItem);
	}
	UnRegisterHotKeyItem() {
		this.HotKeyItem &&
			(this.UnRegisterAllHotKeyComponent(),
			this.HotKeyItem.Clear(),
			this.PanelConfig) &&
			this.PanelConfig.DeleteKeyItem(this.HotKeyItem);
	}
	RegisterAllHotKeyComponent() {
		if (!(this.UiHotKeyState < 3) && 4 !== this.UiHotKeyState) {
			this.UiHotKeyState = 4;
			for (const t of this.HotKeyItem.GetHotKeyComponentArray())
				t && this.RegisterHotKeyComponent(t);
		}
	}
	UnRegisterAllHotKeyComponent() {
		if (4 === this.UiHotKeyState) {
			this.UiHotKeyState = 5;
			for (const t of this.HotKeyItem.GetHotKeyComponentArray())
				t && this.UnRegisterHotKeyComponent(t);
		}
	}
	RegisterHotKeyComponent(t) {
		t.RegisterMe(),
			UiNavigationLogic_1.UiNavigationLogic.BindHotKeyComponentAction(t, !0),
			UiNavigationLogic_1.UiNavigationLogic.BindHotKeyComponentAxis(t, !0);
	}
	UnRegisterHotKeyComponent(t) {
		t.UnRegisterMe(),
			UiNavigationLogic_1.UiNavigationLogic.BindHotKeyComponentAction(t, !1),
			UiNavigationLogic_1.UiNavigationLogic.BindHotKeyComponentAxis(t, !1);
	}
}
(exports.TsUiHotKeyActorComponent = TsUiHotKeyActorComponent),
	(exports.default = TsUiHotKeyActorComponent);
