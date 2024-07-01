"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleLevelUpView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	UiManager_1 = require("../../../Ui/UiManager"),
	AttributeItem_1 = require("../../Common/AttributeItem"),
	ExpComponent_1 = require("../../Common/ExpTween/ExpComponent"),
	SelectableExpData_1 = require("../../Common/PropItem/SelectablePropItem/SelectableExpData"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	ItemDefines_1 = require("../../Item/Data/ItemDefines"),
	ItemRewardController_1 = require("../../ItemReward/ItemRewardController"),
	RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	UiRoleUtils_1 = require("../../UiComponent/UiRoleUtils"),
	UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	RoleController_1 = require("../RoleController"),
	RoleDefine_1 = require("../RoleDefine"),
	AttrListScrollData_1 = require("../View/ViewData/AttrListScrollData"),
	RoleExpItemGridComponent_1 = require("./RoleExpItemGridComponent"),
	RoleLevelUpSuccessController_1 = require("./RoleLevelUpSuccessController");
class RoleLevelUpView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.AttributeLayout = void 0),
			(this.RoleInstance = void 0),
			(this.tuo = void 0),
			(this.uft = void 0),
			(this.SHi = new SelectableExpData_1.SelectableExpData()),
			(this.gHi = void 0),
			(this.iuo = void 0),
			(this.C5i = void 0),
			(this.lqe = void 0),
			(this.CloseClick = () => {
				UiManager_1.UiManager.CloseView("RoleLevelUpView");
			}),
			(this.OnClickItemAdd = (e) => {
				var t = this.uft;
				for (let i = t.length - 1; 0 <= i; i--) {
					var o = t[i];
					if (o.ItemId === e) {
						0 === o.Count
							? ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
									e,
								)
							: this.ouo()
								? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
										"WeaponAddExpTipsText",
									)
								: o.Count > o.SelectedCount && (o.SelectedCount++, this.xHi());
						break;
					}
				}
			}),
			(this.OnClickItemReduce = (e) => {
				var t = this.uft;
				for (let i = t.length - 1; 0 <= i; i--) {
					var o = t[i];
					if (o.ItemId === e) {
						0 < o.SelectedCount && o.SelectedCount--;
						break;
					}
				}
				this.xHi();
			}),
			(this.wHi = () => {
				var e = this.tuo.GetAutoButtonState(),
					t = this.uft;
				if (0 === e) {
					let e = !1;
					for (const o of t)
						if (0 < o.Count) {
							e = !0;
							break;
						}
					if (!e)
						return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"RoleNoMaterial",
						);
					var o = this.SHi.GetExpDistanceToMax();
					ModelManager_1.ModelManager.WeaponModel.AutoAddExpItemEx(
						o,
						t,
						this.ruo,
					),
						this.xHi();
				} else if (1 === e) for (const e of t) e.SelectedCount = 0;
				this.xHi();
			}),
			(this.x_o = (e) => {
				var t = this.uft;
				for (let i = t.length - 1; 0 <= i; i--) {
					var o = t[i];
					if (
						o.ItemId === e &&
						0 < o.Count &&
						o.SelectedCount < o.Count &&
						!this.ouo()
					)
						return !0;
				}
				return !1;
			}),
			(this.w_o = (e) => {
				var t = this.uft;
				for (let i = t.length - 1; 0 <= i; i--) {
					var o = t[i];
					if (o.ItemId === e && o.SelectedCount <= 0) return !1;
				}
				return !0;
			}),
			(this.ruo = (e) =>
				ModelManager_1.ModelManager.RoleModel.GetRoleExpItemExp(e.ItemId)),
			(this.Flo = () => new AttributeItem_1.AttributeItem()),
			(this.nuo = () => {
				this.InitExp(), this.ResetDataList(), this.xHi();
			}),
			(this.suo = () => {
				var e = [];
				for (const i of this.iuo) {
					var t = i[0],
						o = i[1];
					o = new RewardItemData_1.RewardItemData(t.ItemId, o, t.IncId);
					e.push(o);
				}
				ItemRewardController_1.ItemRewardController.OpenCommonRewardView(
					1010,
					e,
					this.auo,
				);
			}),
			(this.huo = () => {
				var e = [];
				for (const i of this.iuo) {
					var t = i[0],
						o = i[1];
					o = new RewardItemData_1.RewardItemData(t.ItemId, o, t.IncId);
					e.push(o);
				}
				ItemRewardController_1.ItemRewardController.OpenCommonRewardView(
					1010,
					e,
					this.luo,
				);
			}),
			(this.NHi = (e) =>
				ModelManager_1.ModelManager.RoleModel.GetRoleLevelUpExp(
					this.RoleInstance.GetRoleId(),
					e + 1,
				)),
			(this.auo = () => {
				UiManager_1.UiManager.CloseView("RoleLevelUpView");
			}),
			(this.luo = () => {
				RoleController_1.RoleController.SendRoleBreakThroughViewRequest(
					this.RoleInstance.GetRoleId(),
					this.Info.Name,
				);
			}),
			(this._uo = () => {
				this.uuo(), this.gHi.PlayExpTween(this.SHi);
			}),
			(this.cuo = (e) => {
				this.iuo = e;
			}),
			(this.UHi = () => {
				var e = this.uft;
				let t = !1;
				for (const o of e)
					if (0 < o.SelectedCount) {
						t = !0;
						break;
					}
				if (t)
					if (this.tuo.GetIsMoneyEnough()) {
						const t = new Array();
						var o;
						e.forEach((e) => {
							var o;
							0 < e.SelectedCount &&
								(((o = new RoleDefine_1.ArrayIntInt()).Ckn = e.ItemId),
								(o.gkn = e.SelectedCount),
								t.push(o));
						}),
							0 < (e = this.SHi.GetOverExp()) &&
							0 <
								(e =
									ModelManager_1.ModelManager.RoleModel.CalculateExpBackItem(e))
									.size
								? (((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
										24,
									)).ItemIdMap = e),
									o.FunctionMap.set(2, () => {
										RoleController_1.RoleController.SendPbUpLevelRoleRequest(
											this.RoleInstance.GetRoleId(),
											t,
											() => {
												UiRoleUtils_1.UiRoleUtils.PlayRoleLevelUpEffect(
													this.C5i,
												);
											},
										);
									}),
									ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
										o,
									))
								: RoleController_1.RoleController.SendPbUpLevelRoleRequest(
										this.RoleInstance.GetRoleId(),
										t,
										() => {
											UiRoleUtils_1.UiRoleUtils.PlayRoleLevelUpEffect(this.C5i);
										},
									);
					} else
						ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"RoleNoMoney",
						);
				else
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"WeaponSelectMaterialTipsText",
					);
			}),
			(this.OnAttributeChangeSequenceFinished = (e) => {
				this.UpdateAttributeItemValue(e);
			}),
			(this.UpdateAttributeItemValue = (e) => {
				var t = e.GetAttributeId(),
					o = this.SHi.GetArrivedLevel(),
					i = this.SHi.GetCurrentLevel(),
					r = this.RoleInstance.GetLevelData().GetBreachLevel(),
					n = ModelManager_1.ModelManager.RoleModel.GetAttributeByLevel(
						this.RoleInstance.GetRoleId(),
						t,
						i,
						r,
					);
				e.SetCurrentValue(n);
				let l = !1,
					a = 0;
				i < o
					? 0 <
							(i = ModelManager_1.ModelManager.RoleModel.GetAddAttrLevelUp(
								this.RoleInstance.GetRoleId(),
								i,
								r,
								o,
								r,
								t,
							)) && ((a = n + i), (l = !0))
					: (l = !1),
					e.SetNextItemActive(l),
					l && e.SetNextValue(a);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIGridLayout],
			[4, UE.UIItem],
		];
	}
	OnStart() {
		this.C5i = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
	}
	async OnBeforeStartAsync() {
		var e = this.OpenParam;
		(this.RoleInstance =
			ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e)),
			void 0 === this.RoleInstance
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Role", 59, "无效的roleId", [
						"界面名称",
						"RoleLevelUpView",
					])
				: ((this.AttributeLayout = new GenericLayout_1.GenericLayout(
						this.GetGridLayout(2),
						this.Flo,
					)),
					(this.tuo = new RoleExpItemGridComponent_1.RoleExpItemGridComponent(
						this.UHi,
						this.wHi,
						this.OnClickItemAdd,
						this.OnClickItemReduce,
						this.x_o,
						this.w_o,
						"RoleLevelUpView",
					)),
					await this.tuo.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
					this.tuo.SetButtonItemText("RoleLevelUp"),
					this.SHi.SetMaxExpFunction(this.NHi),
					(this.gHi = new ExpComponent_1.ExpComponent(this.GetItem(0), !1)),
					this.gHi.Init(),
					this.gHi.BindPlayCompleteCallBack(this.nuo),
					this.gHi.SetLevelFormatText("LevelNumber"),
					(this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(4))),
					this.lqe.SetCurrencyItemList([ItemDefines_1.EItemId.Gold]),
					this.lqe.SetCloseCallBack(this.CloseClick),
					await this.AU(),
					this.Cl());
	}
	OnHandleLoadScene() {
		UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor();
		var e = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
		e && e?.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase"),
			RoleController_1.RoleController.PlayRoleMontage(3, !0);
	}
	OnHandleReleaseScene() {
		UiSceneManager_1.UiSceneManager.HideRoleSystemRoleActor();
	}
	muo() {
		this.uft = [];
		for (const t of ModelManager_1.ModelManager.RoleModel.GetRoleCostExpList()) {
			var e = {
				IncId: 0,
				ItemId: t.Id,
				Count: ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
					t.Id,
				),
				SelectedCount: 0,
			};
			this.uft.push(e);
		}
		this.tuo.Update(this.uft, ItemDefines_1.EItemId.Gold, 0);
	}
	xHi() {
		let e = 0;
		var t = this.uft;
		this.tuo.UpdateByDataList(t),
			t.forEach((t) => {
				e += this.ruo(t) * t.SelectedCount;
			}),
			this.SHi.UpdateExp(e),
			this.gHi.Update(this.SHi),
			(t = this.SHi.GetExpDistanceToMax()),
			(t = ModelManager_1.ModelManager.RoleModel.GetMoneyToLevelUp(
				Math.min(t, e),
			));
		this.tuo.UpdateMoney(ItemDefines_1.EItemId.Gold, t),
			0 < e
				? this.tuo.SetAutoButtonText("PrefabTextItem_3035508725_Text")
				: this.tuo.SetAutoButtonText("PrefabTextItem_744293929_Text"),
			this.jlo();
	}
	duo(e, t) {
		var o = this.AttributeLayout.GetLayoutItemList(),
			i = [],
			r = this.RoleInstance.GetLevelData(),
			n = this.RoleInstance.GetRoleId(),
			l = r.GetBreachLevel();
		for (const r of o) {
			var a = r.GetAttributeId(),
				s = ModelManager_1.ModelManager.RoleModel.GetAttributeByLevel(
					n,
					a,
					e,
					l,
				),
				u = ModelManager_1.ModelManager.RoleModel.GetAttributeByLevel(
					n,
					a,
					t,
					l,
				);
			s !== u &&
				((s = new AttrListScrollData_1.AttrListScrollData(a, s, u, 0, !1, 0)),
				((u =
					RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.ConvertsAttrListScrollDataToAttributeInfo(
						s,
					)).Name =
					ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
						a,
					).AnotherName),
				i.push(u));
		}
		return i;
	}
	async AU() {
		this.muo(), await this.Cuo(), this.InitExp();
	}
	async Cuo() {
		var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
				"RoleAttributeDisplay3",
			),
			t = [],
			o = this.RoleInstance.GetAttributeData(),
			i = e.length;
		for (let n = 0; n < i; n++) {
			var r = {
				Id: (r = e[n]),
				IsRatio: !1,
				CurValue: o.GetAttrValueById(r),
				BgActive: 2 < i && n % 2 == 0,
				UseAnotherName: !0,
			};
			t.push(r);
		}
		await this.AttributeLayout.RefreshByDataAsync(t);
	}
	InitExp() {
		this.UpdateExpData(), this.gHi.UpdateInitState(this.SHi);
	}
	Cl() {
		this.jlo(), this.UpdateButtonState(), this.xHi();
	}
	ResetDataList() {
		for (const e of this.uft)
			(e.SelectedCount = 0),
				(e.Count =
					ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
						e.ItemId,
					));
	}
	jlo() {
		for (const e of this.AttributeLayout.GetLayoutItemList())
			this.UpdateAttributeItemValue(e);
	}
	UpdateExpData() {
		var e = (i = this.RoleInstance.GetLevelData()).GetLevel(),
			t = i.GetCurrentMaxLevel(),
			o = i.GetExp(),
			i = i.GetRoleMaxLevel();
		this.SHi.UpdateComponent(e, t, o, i);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RoleInfoUpdate,
			this._uo,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoleLevelUpReceiveItem,
				this.cuo,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RoleInfoUpdate,
			this._uo,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoleLevelUpReceiveItem,
				this.cuo,
			);
	}
	uuo() {
		var e = this.SHi.GetCurrentLevel(),
			t = this.RoleInstance.GetLevelData(),
			o = t.GetLevel();
		if (o !== e) {
			this.jlo();
			var i = this.iuo && 0 < this.iuo.length,
				r = this.duo(e, o);
			let n;
			t.GetRoleIsMaxLevel()
				? ((n = {
						LevelInfo: {
							PreUpgradeLv: e,
							UpgradeLv: o,
							FormatStringId: "Text_LevelShow_Text",
							IsMaxLevel: !0,
						},
						AttributeInfo: r,
					}).ClickFunction = i ? this.suo : this.auo)
				: t.GetRoleNeedBreakUp()
					? ((n = {
							LevelInfo: {
								PreUpgradeLv: e,
								UpgradeLv: o,
								FormatStringId: "Text_LevelShow_Text",
								IsMaxLevel: !0,
							},
							ClickText: "Text_TurnToRoleBreach_Text",
							AttributeInfo: r,
						}).ClickFunction = i ? this.huo : this.luo)
					: (n = {
							LevelInfo: {
								PreUpgradeLv: e,
								UpgradeLv: o,
								FormatStringId: "Text_LevelShow_Text",
							},
							AttributeInfo: r,
						}),
				n &&
					((t =
						ConfigManager_1.ConfigManager.RoleConfig.GetRoleLevelUpSuccessDelayTime()),
					UiLayer_1.UiLayer.SetShowMaskLayer("OpenLevelUpSuccessView", !0),
					TimerSystem_1.TimerSystem.Delay(() => {
						RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(
							n,
						),
							UiLayer_1.UiLayer.SetShowMaskLayer("OpenLevelUpSuccessView", !1);
					}, t));
		}
	}
	ouo() {
		var e = this.SHi.GetArrivedLevel();
		return this.RoleInstance.GetLevelData().GetCurrentMaxLevel() <= e;
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		var t = this.tuo?.GetGenericScrollView()?.GetGenericLayout();
		if (
			t &&
			(t = t.GetLayoutItemByIndex(Number(e[1]))) &&
			(e = t.GetUiItemForGuide())
		)
			return [e, e];
	}
	UpdateButtonState() {
		var e = this.RoleInstance.GetLevelData().GetRoleIsMaxLevel();
		this.tuo.SetMaxItemActive(e), this.tuo.SetButtonItemActive(!e);
	}
}
exports.RoleLevelUpView = RoleLevelUpView;
