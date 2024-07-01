"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SignalDeviceView = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer"),
	ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine"),
	LevelLoadingController_1 = require("../../Module/LevelLoading/LevelLoadingController"),
	LguiUtil_1 = require("../../Module/Util/LguiUtil"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	LinkingDotItem_1 = require("./SiganalDeviceUIItem/LinkingDotItem"),
	LinkingEmptyToggle_1 = require("./SiganalDeviceUIItem/LinkingEmptyToggle"),
	SignalLineItem_1 = require("./SiganalDeviceUIItem/SignalLineItem"),
	SignalDeviceController_1 = require("./SignalDeviceController"),
	SignalDeviceModel_1 = require("./SignalDeviceModel"),
	GRIDNUM = SignalDeviceModel_1.ROWNUM * SignalDeviceModel_1.ROWNUM;
class SignalDeviceView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.WAe = void 0),
			(this.fPe = void 0),
			(this.pPe = void 0),
			(this.vPe = void 0),
			(this.MPe = void 0),
			(this.SPe = void 0),
			(this.EPe = void 0),
			(this.Lo = void 0),
			(this.yPe = []),
			(this.IPe = []),
			(this.TPe = !1),
			(this.LPe = () => {
				var e;
				this.TPe
					? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
							105,
						)).FunctionMap.set(2, () => {
							UiManager_1.UiManager.CloseView(this.Info.Name);
						}),
						ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
							e,
						))
					: UiManager_1.UiManager.CloseView(this.Info.Name);
			}),
			(this.DPe = () => {
				var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(105);
				e.FunctionMap.set(2, () => {
					LevelLoadingController_1.LevelLoadingController.OpenLoading(
						14,
						3,
						() => {
							SignalDeviceController_1.SignalDeviceController.ResetAll(),
								this.GetButton(0).SetSelfInteractive(!1),
								(this.TPe = !1),
								LevelLoadingController_1.LevelLoadingController.CloseLoading(
									14,
								);
						},
					);
				}),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						e,
					);
			}),
			(this.RPe = () => {
				UiManager_1.UiManager.OpenView("SignalDeviceGuideView");
			}),
			(this.FAe = (e, i, t, n, o) => {
				var r, a;
				this.UPe(e, i, t, n, o),
					e
						? (this.Lo[n].Color === IAction_1.EPieceColorType.White &&
								((e = (t ? this.SPe : this.pPe).GetRootItem()),
								(e = LguiUtil_1.LguiUtil.CopyItem(e, this.yPe[n])),
								(r = t
									? SignalLineItem_1.LinkingLineItem.Create(4)
									: SignalLineItem_1.LinkingLineItem.Create(3)),
								(a =
									ModelManager_1.ModelManager.SignalDeviceModel.NeighboringType(
										i,
										n,
									)),
								this.IPe[n].SetLineData(e, r, a, i, t)),
							this.Lo[i].Color === IAction_1.EPieceColorType.White &&
								((e = this.IPe[i].FromIndex),
								(r = this.IPe[i].IsFromDot),
								Math.abs(e - n) === 2 * SignalDeviceModel_1.ROWNUM ||
								2 === Math.abs(e - n)
									? ((a = (r || o ? this.SPe : this.pPe).GetRootItem()),
										(t = LguiUtil_1.LguiUtil.CopyItem(a, this.yPe[i])),
										(a = SignalLineItem_1.LinkingLineItem.Create(4)),
										this.IPe[i].ResetStraightLineData(t, a, n))
									: Math.abs(e - n) === SignalDeviceModel_1.ROWNUM - 1 ||
											Math.abs(e - n) === SignalDeviceModel_1.ROWNUM + 1
										? ((a = (
												(t = r || o)
													? this.APe(e, r, i, n, o)
														? this.vPe
														: this.MPe
													: this.fPe
											).GetRootItem()),
											(a = LguiUtil_1.LguiUtil.CopyItem(a, this.yPe[i])),
											(t = t
												? this.APe(e, r, i, n, o)
													? SignalLineItem_1.LinkingLineItem.Create(0)
													: SignalLineItem_1.LinkingLineItem.Create(1)
												: SignalLineItem_1.LinkingLineItem.Create(2)),
											this.IPe[i].ResetCornerLineData(a, t, i, n, o))
										: Log_1.Log.CheckWarn() &&
											Log_1.Log.Warn(
												"Temp",
												36,
												"OnSignalDeviceLinking From Error",
												["from", i],
												["beforeIndex", e],
												["to", n],
											)))
						: (this.IPe[i].ClearLineData(),
							this.Lo[n].Color === IAction_1.EPieceColorType.White &&
								this.IPe[n].SetLineHalf());
			}),
			(this.UPe = (e, i, t, n, o) => {
				e
					? (t &&
							((e =
								ModelManager_1.ModelManager.SignalDeviceModel.NeighboringType(
									n,
									i,
								)),
							this.IPe[i].SetDotRay(!0, e)),
						o &&
							((e =
								ModelManager_1.ModelManager.SignalDeviceModel.NeighboringType(
									i,
									n,
								)),
							this.IPe[n].SetDotRay(!0, e)))
					: (t && this.IPe[i].SetDotRay(!1), o && this.IPe[n].SetDotRay(!1));
			}),
			(this.JAe = (e, i) => {
				e &&
					(this.GetButton(0).SetSelfInteractive(!0),
					AudioSystem_1.AudioSystem.PostEvent(
						"play_amb_interact_signal_ui_conncet",
					));
			}),
			(this.zAe = () => {
				AudioSystem_1.AudioSystem.PostEvent(
					"play_amb_interact_signal_ui_reset",
				);
			}),
			(this.PPe = () => {
				this.GetButton(0).SetSelfInteractive(!1), this.xPe(!0);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIButtonComponent],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIExtendToggle],
			[6, UE.UIItem],
			[7, UE.UIText],
			[8, UE.UITexture],
			[9, UE.UITexture],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[0, this.DPe],
				[1, this.LPe],
				[2, this.RPe],
			]);
	}
	async OnCreateAsync() {
		(this.WAe = new LinkingDotItem_1.LinkingDotItem()),
			(this.SPe = SignalLineItem_1.LinkingLineItem.Create(4)),
			(this.pPe = SignalLineItem_1.LinkingLineItem.Create(3)),
			(this.fPe = SignalLineItem_1.LinkingLineItem.Create(2)),
			(this.MPe = SignalLineItem_1.LinkingLineItem.Create(1)),
			(this.vPe = SignalLineItem_1.LinkingLineItem.Create(0)),
			await Promise.all([
				this.WAe.CreateThenShowByResourceIdAsync("UiItem_LinkingDot"),
				this.SPe.CreateThenShowByResourceIdAsync("UiItem_LinkLineA"),
				this.pPe.CreateThenShowByResourceIdAsync("UiItem_LinkLineB"),
				this.fPe.CreateThenShowByResourceIdAsync("UiItem_LinkLineC"),
				this.MPe.CreateThenShowByResourceIdAsync("UiItem_LinkLineE"),
				this.vPe.CreateThenShowByResourceIdAsync("UiItem_LinkLineD"),
			]);
	}
	OnStart() {
		this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
			this.GetRootItem(),
		);
		const e = new LinkingEmptyToggle_1.LinkingEmptyToggle();
		e.CreateThenShowByActor(this.GetExtendToggle(5).GetOwner()),
			this.IPe.push(e);
		var i = this.GetItem(6),
			t = this.GetExtendToggle(5).RootUIComp;
		this.yPe.push(t);
		for (let e = 1; e < GRIDNUM; e++) {
			var n = LguiUtil_1.LguiUtil.CopyItem(t, i);
			this.yPe.push(n);
			const o = new LinkingEmptyToggle_1.LinkingEmptyToggle();
			o.CreateThenShowByActor(n.GetOwner()), o.InitData(e), this.IPe.push(o);
		}
		e.InitData(0),
			this.GetButton(0).SetSelfInteractive(!1),
			this.wPe(),
			AudioSystem_1.AudioSystem.PostEvent("play_amb_interact_signal_ui_open");
	}
	wPe() {
		if (
			(EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSignalDeviceLinking,
				this.FAe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSignalDeviceLinkingCheck,
				this.JAe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSignalDeviceReset,
				this.zAe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSignalDeviceFinish,
				this.PPe,
			),
			(this.Lo = this.OpenParam),
			this.Lo && this.Lo.length === GRIDNUM)
		) {
			for (let e = 0; e < GRIDNUM; e++)
				this.Lo[e].Color !== IAction_1.EPieceColorType.White &&
					this.BPe(e, this.Lo[e].Color);
			this.GetText(3).SetText(
				ConfigManager_1.ConfigManager.TextConfig.GetTextById(
					"SignalDeviceTitleText",
				) ?? "???",
			),
				this.GetText(4).SetText(
					ConfigManager_1.ConfigManager.TextConfig.GetTextById(
						"SignalDeviceDescriptionText",
					) ?? "???",
				),
				this.GetText(7).SetText(
					ConfigManager_1.ConfigManager.TextConfig.GetTextById(
						"SignalDeviceResetText",
					) ?? "???",
				);
		} else
			Log_1.Log.CheckDebug() && Log_1.Log.Debug("Temp", 36, "配置格子数不对");
	}
	OnBeforeDestroy() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnSignalDeviceLinking,
			this.FAe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSignalDeviceLinkingCheck,
				this.JAe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSignalDeviceReset,
				this.zAe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSignalDeviceFinish,
				this.PPe,
			);
	}
	BPe(e, i) {
		var t = LguiUtil_1.LguiUtil.CopyItem(this.WAe.GetRootItem(), this.yPe[e]);
		t.SetHierarchyIndex(0), this.IPe[e].SetDotData(t, i);
	}
	APe(e, i, t, n, o) {
		return i
			? Math.abs(t - e) === SignalDeviceModel_1.ROWNUM
				? (t - e) * (n - t) == -SignalDeviceModel_1.ROWNUM
				: 1 === Math.abs(t - e)
					? (t - e) * (n - t) === SignalDeviceModel_1.ROWNUM
					: (Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn("Temp", 36, "IsCornerLeftOrRight Error"),
						!1)
			: o
				? 1 === Math.abs(t - e)
					? (t - e) * (n - t) == -SignalDeviceModel_1.ROWNUM
					: Math.abs(t - e) === SignalDeviceModel_1.ROWNUM
						? (t - e) * (n - t) === SignalDeviceModel_1.ROWNUM
						: (Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn("Temp", 36, "IsCornerLeftOrRight Error"),
							!1)
				: (Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Temp", 36, "IsCornerLeftOrRight no dot"),
					!1);
	}
	async xPe(e) {
		e &&
			((e = new CustomPromise_1.CustomPromise()),
			await this.EPe.PlaySequenceAsync("Complete", e));
	}
}
exports.SignalDeviceView = SignalDeviceView;
