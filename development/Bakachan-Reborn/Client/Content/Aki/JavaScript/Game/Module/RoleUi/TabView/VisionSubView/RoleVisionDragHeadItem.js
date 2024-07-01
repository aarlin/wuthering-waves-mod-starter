"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleVisionDragHeadItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RedDotController_1 = require("../../../../RedDot/RedDotController"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	VisionFetterSuitItem_1 = require("../../../Phantom/Vision/View/VisionFetterSuitItem"),
	RoleVisionCommonItem_1 = require("./RoleVisionCommonItem");
class RoleVisionDragHeadItem extends RoleVisionCommonItem_1.RoleVisionCommonItem {
	constructor() {
		super(...arguments),
			(this.ClickFunction = void 0),
			(this.PPt = void 0),
			(this.qdo = !1),
			(this.Gdo = 0),
			(this.EPe = void 0),
			(this.Ndo = ""),
			(this.Odo = void 0),
			(this.T7e = () => !1);
	}
	GetPlusItem() {
		return this.GetItem(6);
	}
	GetVisionTextureComponent() {
		return this.GetTexture(2);
	}
	GetVisionQualitySprite() {
		return this.GetSprite(3);
	}
	GetVisionCostText() {
		return this.GetText(5);
	}
	GetVisionCostItem() {
		return this.GetItem(4);
	}
	GetDragComponent() {
		return this.GetDraggable(1);
	}
	GetSelectToggle() {
		return this.GetExtendToggle(0);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIDraggableComponent],
			[2, UE.UITexture],
			[3, UE.UISprite],
			[4, UE.UIItem],
			[5, UE.UIText],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIItem],
			[13, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.OnClickVision]]);
	}
	async OnBeforeStartAsync() {
		(this.PPt = new VisionFetterSuitItem_1.VisionFetterSuitItem(
			this.GetItem(7),
		)),
			await this.PPt.Init();
	}
	SetAniLightState(t) {
		this.GetItem(11).SetUIActive(t);
	}
	OnStart() {
		(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			this.GetItem(8).SetUIActive(!1),
			this.GetExtendToggle(0).CanExecuteChange.Bind(() => this.T7e());
	}
	OnSetClickCallBack(t) {
		this.ClickFunction = t;
	}
	OnDragBegin() {
		this.PPt.GetRootItem().SetUIActive(!1),
			this.GetItem(4).SetUIActive(!1),
			this.kdo(!0);
	}
	OnDragEnd() {
		this.PPt.GetRootItem().SetUIActive(!0), this.kdo(!1);
	}
	OnUpdateItem(t) {
		var e;
		t &&
			(this.GetText(5).SetText(t.GetCost().toString()),
			(e = t.GetFetterGroupConfig()),
			this.PPt.Update(e)),
			this.Fdo(),
			this.Vdo(t),
			this.Hdo(t),
			this.Dpt(),
			this.x6e(t),
			this.kdo(void 0 === t),
			this.GetItem(12)?.SetUIActive(!1);
	}
	kdo(t) {
		this.GetItem(10)?.SetUIActive(t), this.GetItem(13)?.SetUIActive(t);
	}
	Hdo(t) {
		this.GetItem(9).SetUIActive(void 0 !== t);
	}
	Fdo() {
		!this.AnimationState && this.CurrentData
			? (this.GetItem(4).SetUIActive(!0),
				this.PPt.GetRootItem().SetUIActive(!0))
			: (this.PPt.GetRootItem().SetUIActive(!1),
				this.GetItem(4).SetUIActive(!1));
	}
	OnScrollToScrollViewEvent() {
		this.GetItem(12)?.SetUIActive(!0), this.kdo(!1);
	}
	OnRemoveFromScrollViewEvent() {
		this.GetItem(12)?.SetUIActive(!1), this.kdo(!0);
	}
	OnChangeAnimationState() {
		this.Fdo();
	}
	OnItemOverlay() {
		this.PlaySequence("HighLight");
	}
	OnItemUnOverlay() {
		this.PlaySequence("Normal");
	}
	OnPlaySequence(t) {
		this.Ndo !== t && ((this.Ndo = t), this.EPe.PlaySequencePurely(t));
	}
	x6e(t) {
		var e;
		ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
			this.RoleId,
		).IsTrialRole()
			? this.GetItem(8)?.SetUIActive(!1)
			: !this.qdo && this.NeedRedDot && void 0 === t
				? ((this.qdo = !0),
					RedDotController_1.RedDotController.BindRedDot(
						"VisionOneKeyEquip",
						this.GetItem(8),
						void 0,
						this.RoleId,
					),
					(this.Gdo = 0))
				: !this.qdo &&
					this.NeedRedDot &&
					t &&
					((this.qdo = !0),
					(e = t.GetIncrId()),
					RedDotController_1.RedDotController.BindRedDot(
						"IdentifyTab",
						this.GetItem(8),
						void 0,
						e,
					),
					(this.Gdo = 1),
					(this.Odo = t));
	}
	Dpt() {
		this.qdo &&
			((this.qdo = !1),
			0 === this.Gdo
				? RedDotController_1.RedDotController.UnBindGivenUi(
						"VisionOneKeyEquip",
						this.GetItem(8),
						this.RoleId,
					)
				: RedDotController_1.RedDotController.UnBindGivenUi(
						"IdentifyTab",
						this.GetItem(8),
						this.Odo?.GetIncrId(),
					));
	}
	Vdo(t) {
		void 0 !== t
			? ((t = t.GetQuality()),
				(t =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityBgSprite(
						t,
					)),
				this.SetSpriteByPath(t, this.GetSprite(3), !1))
			: ((t =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityBgSprite(
						0,
					)),
				this.SetSpriteByPath(t, this.GetSprite(3), !1));
	}
	OnResetPosition() {
		this.GetDragComponent()?.RootUIComp.SetAsLastHierarchy(),
			"HighLight" === this.Ndo
				? (this.PlaySequence("Normal"), this.EPe.StopCurrentSequence(!1, !0))
				: (this.Ndo = "Normal"),
			(this.AnimationState = !1),
			this.Fdo();
	}
	OnBeforeClearComponent() {
		this.Dpt();
	}
}
exports.RoleVisionDragHeadItem = RoleVisionDragHeadItem;
