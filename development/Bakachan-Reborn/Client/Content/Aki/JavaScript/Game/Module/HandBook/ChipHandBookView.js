"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChipHandBookView = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	AudioController_1 = require("../../../Core/Audio/AudioController"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem"),
	UiManager_1 = require("../../Ui/UiManager"),
	GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	ChipHandBookItem_1 = require("./ChipHandBookItem"),
	HandBookController_1 = require("./HandBookController"),
	HandBookDefine_1 = require("./HandBookDefine"),
	ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class ChipHandBookView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Vzt = void 0),
			(this.HandBookCommonItemDataList = []),
			(this.Qzt = void 0),
			(this.Xzt = new AudioController_1.PlayResult()),
			(this.$zt = 8),
			(this.Yzt = void 0),
			(this.Jzt = 1e3),
			(this.IRe = void 0),
			(this.zzt = -0),
			(this.oUe = -0),
			(this.Zzt = 1e3),
			(this.eZt = void 0),
			(this.tZt = []),
			(this.lqe = void 0),
			(this.iZt = 60),
			(this.oZt = 10),
			(this.Refresh = () => {
				this.InitScrollView(), this.RefreshCollectText();
			}),
			(this.OnHandBookRead = (t, e) => {
				if (6 === t) {
					var i = this.tZt.length;
					for (let t = 0; t < i; t++) {
						var o = this.tZt[t],
							n = (o.RefreshNewState(), o.GetChildItemList()),
							s = n.length;
						for (let t = 0; t < s; t++) {
							var a = n[t];
							if (a.GetData().Id === e) {
								a.SetNewState(!1);
								break;
							}
						}
					}
				}
			}),
			(this.rZt = (t, e, i) => {
				var o = new ChipHandBookItem_1.ChipHandBookItem();
				return (
					o.Initialize(e),
					o.Refresh(t, !1, 0),
					o.BindToggleCallback(this.nZt),
					o.BindChildToggleCallback(this.sZt),
					this.tZt.push(o),
					{ Key: i, Value: o }
				);
			}),
			(this.nZt = (t) => {
				this.ResetChipItemToggleState(), t.SelectFirstChildItem();
			}),
			(this.sZt = (t) => {
				this.Qzt = t;
				var e =
						ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(
							this.Qzt.Id,
						),
					i =
						((e =
							(this.GetText(4).SetText(e),
							ConfigManager_1.ConfigManager.HandBookConfig.GetChipTypeConfig(
								t.Type,
							))),
						0 <
							(e =
								(this.GetText(5).ShowTextNew(e.TypeDescription),
								ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
									this.Qzt.Id,
								))).length),
					o = this.GetItem(17);
				i
					? (o.SetUIActive(!0), this.SetTextureByPath(e[0], this.GetTexture(7)))
					: o.SetUIActive(!1),
					(o = e.length),
					(o =
						0 <
						(e =
							(LguiUtil_1.LguiUtil.SetLocalText(
								this.GetText(8),
								"RoleExp",
								1,
								o,
							),
							ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(
								this.Qzt.Id,
							))).length),
					this.GetItem(16).SetUIActive(o),
					this.GetText(11).ShowTextNew(t.VoiceDescrtption),
					this.GetButton(12).RootUIComp.SetUIActive(!1),
					this.GetButton(13).RootUIComp.SetUIActive(!0),
					(e =
						ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(
							this.Qzt.Id,
						)),
					(t = 0 < e?.length),
					(i = !i && !o),
					void 0 !==
						(o =
							(this.GetItem(20).SetUIActive(i && t),
							this.GetText(21).SetText(e),
							this.GetItem(18).SetUIActive(!i && t),
							this.GetText(9).SetText(e),
							ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
								6,
								this.Qzt.Id,
							))) &&
						!o.IsRead &&
						HandBookController_1.HandBookController.SendIllustratedReadRequest(
							6,
							this.Qzt.Id,
						),
					(i = void 0 === o);
				this.RefreshLockState(i),
					LguiUtil_1.LguiUtil.SetLocalText(
						this.GetText(6),
						"DateOfAcquisition",
						i ? "" : o.CreateTime,
					);
			}),
			(this.aZt = (t, e) => t.Id - e.Id),
			(this.JSt = () => {
				UiManager_1.UiManager.CloseView("ChipHandBookView");
			}),
			(this.hZt = () => {
				this.GetButton(12).RootUIComp.SetUIActive(!0),
					this.GetButton(13).RootUIComp.SetUIActive(!1),
					this.Yzt ||
						(this.Yzt = (0, puerts_1.toManualReleaseDelegate)(this.lZt));
				var t =
					ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(
						this.Qzt.Id,
					);
				AudioController_1.AudioController.PostEventByUi(
					t,
					this.Xzt,
					this.$zt,
					this.Yzt,
				);
			}),
			(this._Zt = () => {
				this.GetButton(12).RootUIComp.SetUIActive(!1),
					this.GetButton(13).RootUIComp.SetUIActive(!0),
					this.Qzt &&
						(this.uZt(),
						(this.zzt = 0),
						AudioController_1.AudioController.StopEvent(this.Xzt),
						this.eZt.SetText(""));
			}),
			(this.cZt = () => {
				var t =
						ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
							this.Qzt.Id,
						),
					e = this.Qzt.Type,
					i =
						((e =
							ConfigManager_1.ConfigManager.HandBookConfig.GetChipTypeConfig(
								e,
							)),
						new HandBookDefine_1.HandBookPhotoData()),
					o =
						ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(
							this.Qzt.Id,
						),
					n = [],
					s =
						((e =
							((o = (n.push(o), [])).push(
								MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
									e.TypeDescription,
								),
							),
							[])),
						ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(
							this.Qzt.Id,
						));
				e.push(s),
					(i.DescrtptionText = n),
					(i.TypeText = o),
					(i.NameText = e),
					(i.HandBookType = 6),
					(i.Index = 0),
					(i.TextureList = t),
					UiManager_1.UiManager.OpenView("HandBookPhotoView", i);
			}),
			(this.lZt = (t, e) => {
				3 === t &&
					((this.oUe = Math.ceil(e.Duration / this.Jzt)),
					(this.IRe = TimerSystem_1.TimerSystem.Loop(
						() => {
							var t, e, i, o;
							(this.zzt = this.zzt + 1),
								this.zzt > this.oUe
									? this._Zt()
									: ((t = this.zzt % this.iZt),
										(e = Math.floor(this.zzt / this.iZt)),
										(i = this.oUe % this.iZt),
										(o = Math.floor(this.oUe / this.iZt)),
										this.SetVoiceProgress(t, e, i, o));
						},
						this.Zzt,
						this.oUe + 1,
					)));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIVerticalLayout],
			[3, UE.UIItem],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIText],
			[7, UE.UITexture],
			[8, UE.UIText],
			[9, UE.UIText],
			[10, UE.UIText],
			[11, UE.UIText],
			[12, UE.UIButtonComponent],
			[13, UE.UIButtonComponent],
			[14, UE.UIButtonComponent],
			[15, UE.UIText],
			[16, UE.UIItem],
			[17, UE.UIItem],
			[18, UE.UIItem],
			[19, UE.UIItem],
			[20, UE.UIItem],
			[21, UE.UIText],
			[22, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[12, this._Zt],
				[13, this.hZt],
				[14, this.cZt],
			]);
	}
	OnStart() {
		this.InitCommonTabTitle(),
			this.Refresh(),
			this.RefreshLockText(),
			(this.eZt = this.GetText(10));
	}
	RefreshLockState(t) {
		this.GetText(4).SetUIActive(!t),
			this.GetText(5).SetUIActive(!t),
			this.GetText(6).SetUIActive(!t),
			this.GetTexture(7).SetUIActive(!t),
			this.GetText(8).SetUIActive(!t),
			this.GetText(9).SetUIActive(!t),
			this.GetText(10).SetUIActive(!t),
			this.GetText(11).SetUIActive(!t),
			this.GetButton(12).RootUIComp.SetUIActive(!1),
			this.GetButton(13).RootUIComp.SetUIActive(!t),
			this.GetButton(14).RootUIComp.SetUIActive(!t),
			this.GetText(15).SetUIActive(t),
			this.GetItem(22).SetUIActive(t),
			this.GetItem(19).SetUIActive(!t),
			this.GetItem(20).SetUIActive(!t);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnHandBookDataInit,
			this.Refresh,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnHandBookDataUpdate,
				this.Refresh,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnHandBookRead,
				this.OnHandBookRead,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnHandBookDataInit,
			this.Refresh,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnHandBookDataUpdate,
				this.Refresh,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnHandBookRead,
				this.OnHandBookRead,
			);
	}
	OnAfterShow() {
		var t = 0 < this.tZt.length ? this.tZt[0] : void 0;
		t &&
			(t = 0 < (t = t.GetChildItemList()).length ? t[0] : void 0) &&
			t.GetTog().SetToggleState(1);
	}
	InitScrollView() {
		var t = ConfigCommon_1.ConfigCommon.ToList(
				ConfigManager_1.ConfigManager.HandBookConfig.GetChipTypeConfigList(),
			),
			e = (t.sort(this.aZt), t.length);
		this.HandBookCommonItemDataList = [];
		for (let a = 0; a < e; a++) {
			var i = t[a],
				o = new HandBookDefine_1.HandBookCommonItemData(),
				n =
					void 0 ===
					(s = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
						6,
						i.Id,
					)),
				s = void 0 !== s && !s.IsRead;
			(o.Icon = i.Icon),
				(o.Title = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					i.TypeDescription,
				)),
				(o.Config = i),
				(o.IsLock = n),
				(o.IsNew = s),
				this.HandBookCommonItemDataList.push(o);
		}
		this.Vzt ||
			(this.Vzt = new GenericLayoutNew_1.GenericLayoutNew(
				this.GetVerticalLayout(2),
				this.rZt,
			)),
			this.Vzt.ClearChildren(),
			this.Vzt.RebuildLayoutByDataNew(this.HandBookCommonItemDataList),
			this.ResetChipItemToggleState();
		var a = this.tZt.length;
		let h = !1;
		for (let t = 0; t < a; t++) {
			var r = this.tZt[t];
			if (r.CheckIsCanShowChildList()) {
				r.SelectFirstChildItem(), (h = !0);
				break;
			}
		}
		h || this.RefreshLockState(!0);
	}
	ResetChipItemToggleState() {
		var t = this.tZt.length;
		for (let e = 0; e < t; e++) this.tZt[e].SetToggleStateForce(0);
	}
	RefreshLockText() {
		var t =
			ConfigManager_1.ConfigManager.TextConfig.GetTextById("ChipHandBookLock");
		this.GetText(15).SetText(t);
	}
	InitCommonTabTitle() {
		var t =
			ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(6);
		(this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
			this.lqe.SetCloseCallBack(this.JSt),
			this.lqe.SetTitleLocalText(t.Name),
			this.lqe.SetTitleIcon(t.TitleIcon);
	}
	uZt() {
		TimerSystem_1.TimerSystem.Has(this.IRe) &&
			TimerSystem_1.TimerSystem.Remove(this.IRe),
			(this.IRe = void 0);
	}
	SetVoiceProgress(t, e, i, o) {
		LguiUtil_1.LguiUtil.SetLocalText(
			this.eZt,
			"VoiceProgress",
			this.TimeFormat(e),
			this.TimeFormat(t),
			this.TimeFormat(o),
			this.TimeFormat(i),
		);
	}
	TimeFormat(t) {
		return t < this.oZt ? "0" + String(t) : String(t);
	}
	RefreshCollectText() {
		var t = HandBookController_1.HandBookController.GetCollectProgress(6);
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "RoleExp", t[0], t[1]),
			this.GetText(1)?.SetUIActive(!1);
	}
	OnBeforeDestroy() {
		this.Vzt && (this.Vzt.ClearChildren(), (this.Vzt = void 0)),
			this.Yzt &&
				((0, puerts_1.releaseManualReleaseDelegate)(this.lZt),
				(this.Yzt = void 0)),
			AudioController_1.AudioController.StopEvent(this.Xzt),
			(this.zzt = 0),
			(this.oUe = 0),
			(this.eZt = void 0),
			(this.tZt = []),
			(this.HandBookCommonItemDataList = []),
			(this.Qzt = void 0);
	}
}
exports.ChipHandBookView = ChipHandBookView;
