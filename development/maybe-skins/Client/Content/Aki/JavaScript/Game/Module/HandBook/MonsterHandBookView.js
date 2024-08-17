"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonsterHandBookView = void 0);
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
	CommonTabItemBase_1 = require("../Common/TabComponent/TabItem/CommonTabItemBase"),
	UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager"),
	UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
	HandBookBaseView_1 = require("./HandBookBaseView"),
	HandBookCommonTypeItem_1 = require("./HandBookCommonTypeItem"),
	HandBookController_1 = require("./HandBookController"),
	HandBookDefine_1 = require("./HandBookDefine"),
	ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class MonsterHandBookView extends HandBookBaseView_1.HandBookBaseView {
	constructor() {
		super(...arguments),
			(this.eei = []),
			(this.tei = []),
			(this.bzt = void 0),
			(this.gU = !1),
			(this.iei = void 0),
			(this.OnHandBookRead = (e, t) => {
				if (0 === e) {
					var n = this.tei.length;
					for (let e = 0; e < n; e++) {
						var o = this.tei[e].GetHandBookCommonItemList(),
							a = o.length;
						for (let e = 0; e < a; e++) {
							var i = o[e];
							if (i.GetData().Config.Id === t)
								return void i.SetNewFlagVisible(!1);
						}
					}
				}
			}),
			(this.Refresh = () => {
				var e = ConfigCommon_1.ConfigCommon.ToList(
						ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookTypeConfig(),
					),
					t = (e.sort(this.aZt), e.length),
					n = [];
				for (let h = 0; h < t; h++) {
					var o = e[h],
						a = o.Id,
						i =
							ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigByType(
								a,
							),
						r = (this.eei.push(i), i.length),
						s = [];
					for (let e = 0; e < r; e++) {
						var g = i[e],
							m =
								ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(
									g.Id,
								),
							d =
								void 0 ===
								(l = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
									0,
									g.Id,
								)),
							l = void 0 !== l && !l.IsRead,
							C = new HandBookDefine_1.HandBookCommonItemData();
						(C.Icon = m),
							(C.Config = g),
							(C.IsLock = d),
							(C.IsNew = l),
							(C.Title = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
								o.Descrtption,
							)),
							s.push(C);
					}
					n.push(s);
				}
				(this.tei = []), (this.gU = !1), this.InitScrollViewByCommonTypeItem(n);
				var h =
					ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(
						0,
					);
				this.InitCommonTabTitle(
					h.TitleIcon,
					new CommonTabTitleData_1.CommonTabTitleData(h.Name),
				),
					(this.gU = !0),
					0 < this.tei.length && (this.iei = this.tei[0].SetToggleChecked());
			}),
			(this.InitHandBookCommonTypeItem = (e, t, n) => {
				var o = new HandBookCommonTypeItem_1.HandBookCommonTypeItem();
				return (
					o.Initialize(t),
					o.BindToggleCallback(this.OnToggleClick),
					o.Refresh(e, !1, n),
					this.tei.push(o),
					{ Key: n, Value: o }
				);
			}),
			(this.OnToggleClick = (e, t) => {
				if (this.gU)
					if (
						(this.iei?.SetSelected(!1),
						(this.iei = t).SetSelected(!0),
						(t = e.Config),
						e.IsLock)
					)
						this.SetLockState(!0);
					else {
						this.SetLockState(!1),
							e.IsNew &&
								HandBookController_1.HandBookController.SendIllustratedReadRequest(
									0,
									t.Id,
								);
						e =
							ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(
								t.Id,
							);
						var n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name),
							o =
								((n = (this.SetNameText(n), [])),
								MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
									t.TypeDescrtption,
								)),
							a =
								((o = (n.push(o), this.InitInfoItemLayout(n), [])),
								(n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
									t.Descrtption,
								)),
								ConfigManager_1.ConfigManager.TextConfig.GetTextById(
									"FightSkill",
								)),
							i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
								t.FightSkillDescrtption,
							),
							r =
								(o.push(
									new HandBookDefine_1.HandBookContentItemData("", n),
									new HandBookDefine_1.HandBookContentItemData(a, i),
								),
								this.InitContentItemLayout(o),
								[]),
							s = t.PhantomItem,
							g = s.length;
						for (let e = 0; e < g; e++) {
							var m = s[e];
							r.push([{ IncId: 0, ItemId: m }, 0]);
						}
						var d =
								ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterPerch(
									e.Id,
								),
							l = d.length;
						let h = "";
						for (let e = 0; e < l; e++) {
							var C = d[e];
							e === l - 1 ? (h += C) : (h = h + C + ",");
						}
						(n = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
							0,
							t.Id,
						)),
							this.SetKillText(n.Num),
							HandBookController_1.HandBookController.SetMonsterMeshShow(
								t.Id,
								this.qzt,
							);
					}
			}),
			(this.aZt = (e, t) => e.Id - t.Id),
			(this.qzt = void 0);
	}
	OnStart() {
		this.SetDefaultState(),
			this.RefreshCollectText(),
			this.RefreshLockText(),
			this.Refresh();
	}
	OnAfterShow() {
		this.bzt =
			UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
				"1062",
			);
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
	RefreshCollectText() {
		var e = HandBookController_1.HandBookController.GetCollectProgress(0);
		this.SetCollectText(e[0], e[1]);
	}
	RefreshLockText() {
		var e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
			"MonsterHandBookLock",
		);
		this.SetLockText(e);
	}
	ResetAllToggleState(e) {
		var t = this.tei.length;
		for (let o = 0; o < t; o++) {
			var n = this.tei[o];
			o !== e && n.ResetAllToggleState();
		}
	}
	GetTabItemData(e) {
		var t = new Array(),
			n = this.TabList.length;
		for (let e = 0; e < n; e++) {
			var o = new CommonTabItemBase_1.CommonTabItemData();
			(o.Index = e), (o.Data = this.TabList[e]), t.push(o);
		}
		return t;
	}
	OnBeforePlayCloseSequence() {
		UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(
			this.bzt,
		);
	}
	OnBeforeCreate() {
		UiSceneManager_1.UiSceneManager.InitHandBookObserver(),
			(this.qzt = UiSceneManager_1.UiSceneManager.GetHandBookObserver());
	}
	OnBeforeDestroy() {
		UiSceneManager_1.UiSceneManager.DestroyHandBookObserver(),
			(this.qzt = void 0),
			(this.eei = []),
			(this.tei = []),
			(this.bzt = void 0);
	}
}
exports.MonsterHandBookView = MonsterHandBookView;
