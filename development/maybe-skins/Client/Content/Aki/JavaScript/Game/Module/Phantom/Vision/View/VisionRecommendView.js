"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionRecommendView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
	GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew"),
	LguiUtil_1 = require("../../../Util/LguiUtil");
class VisionRecommendView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.QHi = void 0),
			(this.XHi = void 0),
			(this.sGe = (e, t, o) => (
				(t = new RecommendSubItem(t)).Refresh(e), { Key: o, Value: t }
			)),
			(this.dIt = () => {
				var e,
					t =
						ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance();
				ModelManager_1.ModelManager.PhantomBattleModel.GetRoleIfEquipVision(
					t.GetRoleId(),
				)
					? this.$Hi()
					: ((e =
							ControllerHolder_1.ControllerHolder.PhantomBattleController.GetRecommendEquipUniqueIdList(
								t.GetRoleId(),
							)),
						ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomAutoPutRequest(
							t.GetRoleId(),
							e,
						),
						UiManager_1.UiManager.CloseView("VisionRecommendView"));
			}),
			(this.bl = () => {
				var e =
						ModelManager_1.ModelManager.PhantomBattleModel.PhantomRecommendData
							.MonsterIdList,
					t = (this.QHi.Refresh(e[0]), []);
				for (let o = 1; o < e.length; o++) t.push(e[o]);
				this.XHi.RebuildLayoutByDataNew(t);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIVerticalLayout],
			[2, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[2, this.dIt]]);
	}
	OnStart() {
		(this.QHi = new RecommendMainItem(this.GetItem(0))),
			(this.XHi = new GenericLayoutNew_1.GenericLayoutNew(
				this.GetVerticalLayout(1),
				this.sGe,
			));
	}
	$Hi() {
		const e =
			ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance();
		var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(96);
		t.FunctionMap.set(1, () => {
			ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
		}),
			t.FunctionMap.set(2, () => {
				var t =
					ControllerHolder_1.ControllerHolder.PhantomBattleController.GetRecommendEquipUniqueIdList(
						e.GetRoleId(),
					);
				ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
					ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomAutoPutRequest(
						e.GetRoleId(),
						t,
					),
					UiManager_1.UiManager.CloseView("VisionRecommendView");
			}),
			ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
				t,
			);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.PhantomRecommendResponse,
			this.bl,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.PhantomRecommendResponse,
			this.bl,
		);
	}
	OnAfterShow() {
		var e =
			ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance();
		ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomRecommendRequest(
			e.GetRoleId(),
		);
	}
	OnBeforeDestroy() {
		this.XHi.ClearChildren();
	}
}
exports.VisionRecommendView = VisionRecommendView;
class RecommendMainItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.c6i = 0),
			(this.Kyt = () => {
				ControllerHolder_1.ControllerHolder.AdventureGuideController.JumpToTargetView(
					"MonsterDetectView",
					ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
						this.c6i,
					)?.MonsterProbeId,
				),
					UiManager_1.UiManager.CloseView("VisionRecommendView");
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIButtonComponent],
			[2, UE.UITexture],
			[3, UE.UITexture],
		]),
			(this.BtnBindInfo = [[1, this.Kyt]]);
	}
	Refresh(e) {
		var t;
		(this.c6i = e),
			(e =
				ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomItemIdArrayByMonsterId(
					this.c6i,
				)) &&
				0 !== e.length &&
				((t =
					ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
						e[0],
					)),
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(0),
					t.PhantomItem.MonsterName,
				),
				(e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
					e[0],
				)),
				this.SetTextureByPath(e.IconSmall, this.GetTexture(3)),
				(e =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
						t.PhantomItem.SkillId,
					)),
				this.SetTextureByPath(e.SpecialBattleViewIcon, this.GetTexture(2)));
	}
}
class RecommendSubItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.c6i = 0),
			(this.Kyt = () => {
				ControllerHolder_1.ControllerHolder.AdventureGuideController.JumpToTargetView(
					"MonsterDetectView",
					ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
						this.c6i,
					)?.MonsterProbeId,
				),
					UiManager_1.UiManager.CloseView("VisionRecommendView");
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIButtonComponent],
			[2, UE.UITexture],
		]),
			(this.BtnBindInfo = [[1, this.Kyt]]);
	}
	Refresh(e) {
		var t;
		(this.c6i = e),
			(e =
				ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomItemIdArrayByMonsterId(
					this.c6i,
				)) &&
				0 !== e.length &&
				((t =
					ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
						e[0],
					)),
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(0),
					t.PhantomItem.MonsterName,
				),
				(t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
					e[0],
				)),
				this.SetTextureByPath(t.IconSmall, this.GetTexture(2)));
	}
}
