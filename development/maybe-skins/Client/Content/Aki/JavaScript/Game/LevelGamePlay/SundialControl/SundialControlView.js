"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SundialControlView = void 0);
const UE = require("ue"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LevelLoadingController_1 = require("../../Module/LevelLoading/LevelLoadingController"),
	LguiUtil_1 = require("../../Module/Util/LguiUtil"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	SundialControlController_1 = require("./SundialControlController"),
	TIPS_TEXT = "PrefabTextItem_2335089801_Text",
	RESET_TEXT = "PrefabTextItem_2335089802_Text",
	SWITCH_TEXT = "PrefabTextItem_2335089799_Text",
	ROTATE_TEXT = "PrefabTextItem_2335089800_Text",
	ringOneTips = [
		"PrefabTextItem_2335089803_Text",
		"PrefabTextItem_2335089814_Text",
		"PrefabTextItem_2335089813_Text",
		"PrefabTextItem_2335089812_Text",
		"PrefabTextItem_2335089811_Text",
		"PrefabTextItem_2335089810_Text",
		"PrefabTextItem_2335089809_Text",
		"PrefabTextItem_2335089808_Text",
		"PrefabTextItem_2335089807_Text",
		"PrefabTextItem_2335089806_Text",
		"PrefabTextItem_2335089805_Text",
		"PrefabTextItem_2335089804_Text",
	],
	ringTwoTips = [
		"PrefabTextItem_2335089818_Text",
		"PrefabTextItem_2335089817_Text",
		"PrefabTextItem_2335089815_Text",
		"PrefabTextItem_2335089816_Text",
	];
class SundialControlView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Fxe = void 0),
			(this.Vxe = void 0),
			(this.Hxe = void 0),
			(this.jxe = void 0),
			(this.DPe = () => {
				this.Wxe();
			}),
			(this.Kxe = () => {
				SundialControlController_1.SundialControlController.SwitchCurrentRing();
			}),
			(this.Qxe = () => {
				this.Xxe(!1),
					SundialControlController_1.SundialControlController.StartRotate(
						() => {
							this.Xxe(!0);
						},
					);
			}),
			(this.LPe = () => {
				this.CloseMe();
			}),
			(this.$xe = (e, t) => {
				(t = (e = 0 === e ? ringOneTips : ringTwoTips)[t % e.length]),
					(e = this.GetText(4)),
					LguiUtil_1.LguiUtil.SetLocalTextNew(e, t);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIButtonComponent],
			[3, UE.UIButtonComponent],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIText],
			[7, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[0, this.DPe],
				[1, this.Kxe],
				[3, this.LPe],
				[2, this.Qxe],
			]);
	}
	OnStart() {
		(this.Fxe = this.GetButton(0)),
			(this.Vxe = this.GetButton(1)),
			(this.Hxe = this.GetButton(2)),
			(this.jxe = this.GetButton(3)),
			this.jxe.RootUIComp.SetUIActive(!1),
			this.Fxe.RootUIComp.SetUIActive(!1);
		var e = this.GetText(4);
		LguiUtil_1.LguiUtil.SetLocalTextNew(e, TIPS_TEXT),
			(e = this.GetText(5)),
			LguiUtil_1.LguiUtil.SetLocalTextNew(e, RESET_TEXT),
			(e = this.GetText(6)),
			LguiUtil_1.LguiUtil.SetLocalTextNew(e, SWITCH_TEXT),
			(e = this.GetText(7));
		LguiUtil_1.LguiUtil.SetLocalTextNew(e, ROTATE_TEXT),
			SundialControlController_1.SundialControlController.SetOnFinishCallback(
				() => {
					this.Fxe.RootUIComp.SetUIActive(!1),
						this.Vxe.RootUIComp.SetUIActive(!1),
						this.Hxe.RootUIComp.SetUIActive(!1),
						this.jxe.RootUIComp.SetUIActive(!1);
				},
			),
			this.Yxe(),
			TimerSystem_1.TimerSystem.Delay(() => {
				SundialControlController_1.SundialControlController.GenerateModel(
					() => {
						this.Jxe();
					},
				);
			}, 100);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnNeedUpdateSundialTips,
			this.$xe,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnNeedUpdateSundialTips,
			this.$xe,
		);
	}
	async Yxe() {
		this.Xxe(!1),
			await this.HideAsync(),
			await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
				6,
				3,
			);
	}
	async Jxe() {
		await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(6),
			await this.ShowAsync(),
			this.Xxe(!0),
			SundialControlController_1.SundialControlController.UpdateViewTips();
	}
	OnBeforeDestroy() {
		SundialControlController_1.SundialControlController.SetOnFinishCallback(
			void 0,
		),
			SundialControlController_1.SundialControlController.DestroyModel();
	}
	async Wxe() {
		this.Xxe(!1),
			await this.HideAsync(),
			await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
				6,
				3,
			),
			SundialControlController_1.SundialControlController.ResetAll(),
			await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(6),
			await this.ShowAsync(),
			SundialControlController_1.SundialControlController.UpdateViewTips(),
			this.Xxe(!0);
	}
	Xxe(e) {
		this.Fxe.SetSelfInteractive(e),
			this.Vxe.SetSelfInteractive(e),
			this.Hxe.SetSelfInteractive(e),
			this.jxe.SetSelfInteractive(e);
	}
}
exports.SundialControlView = SundialControlView;
