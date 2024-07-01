"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionLevelUpView = void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
	UiLayer_1 = require("../../../../Ui/UiLayer"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	CommonItemSelectView_1 = require("../../../Common/CommonItemSelectView"),
	CommonMultipleConsumeComponent_1 = require("../../../Common/Consume/CommonMultipleConsumeComponent"),
	ItemGridConsumeComponent_1 = require("../../../Common/Consume/ItemGridConsumeComponent"),
	ExpComponent_1 = require("../../../Common/ExpTween/ExpComponent"),
	CommonIntensifyPropExpData_1 = require("../../../Common/Model/CommonIntensifyPropExpData"),
	SelectableComponent_1 = require("../../../Common/PropItem/SelectablePropItem/SelectableComponent"),
	SelectableExpData_1 = require("../../../Common/PropItem/SelectablePropItem/SelectableExpData"),
	ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
	ItemDefines_1 = require("../../../Item/Data/ItemDefines"),
	RoleLevelUpSuccessController_1 = require("../../../RoleUi/RoleLevel/RoleLevelUpSuccessController"),
	ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
	UiSceneManager_1 = require("../../../UiComponent/UiSceneManager"),
	UiModelUtil_1 = require("../../../UiModel/UiModelUtil"),
	VisionIdentifyComponent_1 = require("./VisionIdentifyComponent"),
	VisionMainAttributeComponent_1 = require("./VisionMainAttributeComponent"),
	VisionNameText_1 = require("./VisionNameText");
class VisionLevelUpView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.gHi = void 0),
			(this.fHi = void 0),
			(this.G7i = 0),
			(this.pHi = 0),
			(this.vHi = []),
			(this.MHi = void 0),
			(this.SHi = void 0),
			(this.q7i = void 0),
			(this.b7i = void 0),
			(this.EHi = 0),
			(this.O7i = !1),
			(this.v8i = void 0),
			(this.zIt = (e) => {
				(this.EHi = e),
					(e =
						ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityList()[
							this.EHi
						].Id),
					this.fHi.RefreshConditionText(
						ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityById(e)
							.ConsumeFilterText,
					);
			}),
			(this.yHi = (e) => {
				e &&
					(UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", !1),
					(e = this.IHi()),
					(this.SHi = e),
					this.gHi.UpdateInitState(e));
			}),
			(this.THi = () => {
				UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", !0),
					this.gHi.PlayExpTween(this.SHi),
					(this.vHi = []),
					this.LHi(),
					this.fHi.UpdateComponent(ItemDefines_1.EItemId.Gold, 0, this.MHi);
				var e =
						ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
							this.G7i,
						).GetPhantomLevel(),
					t =
						ControllerHolder_1.ControllerHolder.PhantomBattleController.GetMaxLevel(
							this.G7i,
						);
				this.fHi.SetMaxState(e === t), (this.pHi = 0), this.g0t(), this.DHi();
			}),
			(this.RHi = () => {
				if (0 === this.vHi?.length)
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"VisionNotSelectItem",
					);
				else if (this.fHi.GetEnoughMoney()) {
					let o,
						n = !1,
						r = !1,
						l = !1;
					for (const t of this.vHi) {
						var e =
							ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
								t.IncId,
							);
						e &&
							(!n &&
								ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighQuality(
									e,
								) &&
								(n = !0),
							!r &&
								ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighLevel(
									e,
								) &&
								(r = !0),
							!l) &&
							ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighRare(
								e,
							) &&
							(l = !0);
					}
					var t,
						i = [];
					switch (
						(n &&
							((t =
								ConfigManager_1.ConfigManager.TextConfig.GetTextById(
									"VisionHighQuality",
								)),
							i.push(t)),
						r &&
							((t =
								ConfigManager_1.ConfigManager.TextConfig.GetTextById(
									"VisionHighLevel",
								)),
							i.push(t)),
						l &&
							((t =
								ConfigManager_1.ConfigManager.TextConfig.GetTextById(
									"VisionHighRare",
								)),
							i.push(t)),
						i.length)
					) {
						case 1:
							o = 127;
							break;
						case 2:
							o = 126;
							break;
						case 3:
							o = 125;
					}
					o
						? ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(o)).SetTextArgs(
								...i,
							),
							t.FunctionMap.set(2, () => {
								this.UHi();
							}),
							ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
								t,
							))
						: this.UHi();
				} else
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"WeaponNoEnoughMoneyText",
					);
			}),
			(this.UHi = () => {
				const e = new Array(),
					t = new Map();
				this.vHi.forEach((i) => {
					var o;
					(o =
						(((o = new Protocol_1.Aki.Protocol.e3s()).I5n = i.SelectedCount),
						(o.Ykn = i.IncId),
						(o.G3n = i.ItemId),
						e.push(o),
						ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
							i.IncId,
						))) && ((i = o.GetIdentifyBackItem()), this.AHi(i, t));
				});
				var i = this.SHi.GetOverExp();
				0 < i &&
					((i =
						ModelManager_1.ModelManager.PhantomBattleModel.CalculateExpBackItem(
							i,
						)),
					this.AHi(i, t)),
					0 < t.size
						? (((i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(24)).ItemIdMap =
								t),
							i.FunctionMap.set(2, () => {
								ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomLevelUpRequest(
									this.G7i,
									e,
								);
							}),
							ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
								i,
							))
						: ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomLevelUpRequest(
								this.G7i,
								e,
							);
			}),
			(this.PHi = () => {
				(this.vHi = []), this.xHi();
			}),
			(this.wHi = () => {
				var e =
					ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityList()[
						this.EHi
					].Id;
				if (
					0 ===
					(e =
						ModelManager_1.ModelManager.PhantomBattleModel.GetSortedExpMaterialList(
							this.G7i,
							e,
						)).length
				)
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"WeaponNoMaterial",
					);
				else {
					const t = new Array();
					e.forEach((e) => {
						(e = {
							IncId: e.GetUniqueId(),
							ItemId: e.GetConfigId(),
							Count: e.GetCount(),
							SelectedCount: 0,
						}),
							t.push(e);
					}),
						(e = this.SHi.GetExpDistanceToMax()),
						(e = ModelManager_1.ModelManager.WeaponModel.AutoAddExpItem(
							e,
							20,
							t,
							this.BHi,
						)),
						(this.vHi = e),
						this.xHi();
				}
			}),
			(this.bHi = (e, t) => {
				for (let i = this.vHi.length - 1; 0 <= i; i--)
					this.vHi[i].ItemId === t &&
						this.vHi[i].IncId === e &&
						(this.vHi[i].SelectedCount--, 0 === this.vHi[i].SelectedCount) &&
						this.vHi.splice(i, 1);
				this.xHi();
			}),
			(this.qHi = () => {
				this.GHi(0, 0);
			}),
			(this.GHi = (e, t) => {
				var i = new CommonItemSelectView_1.CommonItemSelectViewOpenViewData(),
					o = ModelManager_1.ModelManager.PhantomBattleModel.GetExpMaterialList(
						this.G7i,
					),
					n =
						ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
							this.G7i,
						),
					r = new CommonIntensifyPropExpData_1.CommonIntensifyPropExpData();
				(r.CurrentExp = n.GetExp()),
					(r.CurrentLevel = n.GetPhantomLevel()),
					(r.CurrentMaxLevel =
						ControllerHolder_1.ControllerHolder.PhantomBattleController.GetMaxLevel(
							this.G7i,
						)),
					(r.MaxExpFunction = this.NHi),
					(r.GetItemExpFunction = this.BHi),
					(n = this.vHi);
				((o =
					((i.ItemDataBaseList = o),
					(i.SelectedDataList = n),
					(i.UseWayId = 26),
					(i.ExpData = r),
					new SelectableComponent_1.SelectableComponentData())).IsSingleSelected =
					!1),
					((i.SelectableComponentData = o).OnChangeSelectedFunction = this.pvt),
					UiManager_1.UiManager.OpenView("CommonItemSelectViewRight", i);
			}),
			(this.NHi = (e) => {
				var t =
					ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
						this.G7i,
					);
				t =
					ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
						t.GetConfigId(),
					);
				return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomLevelExpByGroupIdAndLevel(
					t.PhantomItem.LevelUpGroupId,
					e + 1,
				);
			}),
			(this.pvt = (e, t) => {
				(this.vHi = e), (this.SHi = t), this.xHi();
			}),
			(this.BHi = (e) => {
				var t =
					ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
						e.IncId,
					);
				return t
					? t.GetEatFullExp()
					: ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemById(
							e.ItemId,
						).Exp;
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIText],
		];
	}
	async OnBeforeStartAsync() {
		(this.b7i = new VisionIdentifyComponent_1.LevelUpIdentifyComponent(
			this.GetItem(3),
		)),
			await this.b7i.Init(this.GetViewName());
		var e =
			new CommonMultipleConsumeComponent_1.CommonMultipleConsumeFunction();
		(e.StrengthFunction = this.RHi),
			(e.MaterialItemFunction = this.GHi),
			(e.ItemClickFunction = this.qHi),
			(e.ReduceItemFunction = this.bHi),
			(e.AutoFunction = this.wHi),
			(e.DeleteSelectFunction = this.PHi),
			(this.fHi = new ItemGridConsumeComponent_1.ItemGridConsumeComponent(
				this.GetItem(2),
				e,
				"VisionLevelUpView",
			)),
			await this.fHi.Init(),
			this.fHi.SetActive(!0),
			(this.q7i =
				new VisionMainAttributeComponent_1.VisionMainAttributeComponent()),
			await this.q7i.CreateByActorAsync(this.GetItem(1).GetOwner());
	}
	OnStart() {
		(this.gHi = new ExpComponent_1.ExpComponent(this.GetItem(0), !1)),
			this.gHi.Init(),
			this.gHi.SetLevelFormatText("VisionLevel"),
			this.gHi.BindPlayCompleteCallBack(this.yHi),
			this.fHi.InitFilter(0, this.zIt),
			this.fHi.SetConsumeTexture(ItemDefines_1.EItemId.Gold);
		var e = this.fHi.GetMaxCount();
		this.MHi = new Array(e);
		for (let t = 0; t < e; t++) this.MHi[t] = [{ IncId: 0, ItemId: 0 }, 0];
		this.v8i = new VisionNameText_1.VisionNameText(this.GetText(4));
	}
	DHi() {
		var e =
				ModelManager_1.ModelManager.PhantomBattleModel.GetCachePhantomLevelUpData(),
			t =
				ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
					this.G7i,
				).GetPhantomLevel();
		e.Level !== t &&
			((e =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionLevelUpDelay()),
			TimerSystem_1.TimerSystem.Delay(() => {
				var e =
					UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle()?.Model;
				e &&
					UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
						e,
						"VisionStepupController",
					),
					(e =
						ModelManager_1.ModelManager.PhantomBattleModel.GetLevelUpSuccessData(
							this.G7i,
						));
				RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(
					e,
				);
			}, e));
	}
	OHi(e) {
		(this.G7i = e),
			(e = this.IHi()),
			this.gHi.UpdateInitState(e),
			this.fHi.SetMaxState(e.GetCurrentLevel() === e.GetCurrentMaxLevel()),
			this.pvt([], e);
	}
	IHi() {
		var e = new CommonIntensifyPropExpData_1.CommonIntensifyPropExpData(),
			t =
				ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
					this.G7i,
				);
		return (t =
			((e.CurrentExp = t.GetExp()),
			(e.CurrentLevel = t.GetPhantomLevel()),
			(e.CurrentMaxLevel =
				ControllerHolder_1.ControllerHolder.PhantomBattleController.GetMaxLevel(
					this.G7i,
				)),
			(e.MaxExpFunction = this.NHi),
			SelectableExpData_1.SelectableExpData.PhraseData(e)));
	}
	OnBeforeShow() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.PhantomLevelUp,
			this.THi,
		),
			(this.O7i = !0),
			(this.G7i = this.ExtraParams),
			(this.pHi = 0),
			this.OHi(this.G7i),
			this.g0t(),
			this.C4e();
	}
	C4e() {
		var e =
			ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
				this.G7i,
			);
		this.v8i.Update(e);
	}
	g0t() {
		var e =
				ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
					this.G7i,
				),
			t = e.GetLevelUpPreviewData(e.GetPhantomLevel() + this.pHi);
		this.q7i.Update(t),
			(t = e.GetLevelSubPropPreviewData(
				e.GetPhantomLevel(),
				e.GetPhantomLevel() + this.pHi,
			));
		this.b7i.Update(t, !1), this.b7i.GetRootItem().SetUIActive(0 < t.length);
	}
	dEe() {
		this.O7i &&
			((this.O7i = !1),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PhantomLevelUp,
				this.THi,
			));
	}
	OnBeforeHide() {
		this.dEe();
	}
	AHi(e, t) {
		e.forEach((e, i) => {
			let o = t.get(i);
			(o = o || 0), (o += e), t.set(i, o);
		});
	}
	xHi() {
		let e = 0;
		if ((this.LHi(), this.vHi))
			for (let o = 0; o < this.vHi.length; o++) {
				var t = this.vHi[o],
					i = this.MHi[o];
				(i[0].IncId = t.IncId),
					(i[0].ItemId = t.ItemId),
					(i[1] = t.SelectedCount),
					(e += this.BHi(t) * t.SelectedCount);
			}
		this.SHi.UpdateExp(e),
			this.gHi.Update(this.SHi),
			(this.pHi = this.SHi.GetArrivedLevel() - this.SHi.GetCurrentLevel());
		var o = this.SHi.GetExpDistanceToMax();
		this.fHi.UpdateComponent(
			ItemDefines_1.EItemId.Gold,
			ControllerHolder_1.ControllerHolder.PhantomBattleController.GetLevelUpNeedCost(
				Math.min(e, o),
			),
			this.MHi,
		),
			this.g0t();
	}
	LHi() {
		this.MHi.forEach((e) => {
			(e[0].IncId = 0), (e[0].ItemId = 0), (e[1] = 0);
		});
	}
	OnBeforeDestroy() {
		this.dEe(), this.q7i.Destroy(), this.b7i.Destroy();
	}
}
exports.VisionLevelUpView = VisionLevelUpView;
