"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TipsVisionComponent = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	VisionFetterSuitItem_1 = require("../../../Phantom/Vision/View/VisionFetterSuitItem"),
	GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	ItemTipsAttribute_1 = require("./ItemTipsAttribute"),
	ItemTipsBaseSubComponent_1 = require("./ItemTipsBaseSubComponent"),
	ItemTipsGetWay_1 = require("./ItemTipsGetWay"),
	ItemTipsLockButton_1 = require("./ItemTipsLockButton");
class TipsVisionComponent extends ItemTipsBaseSubComponent_1.TipsBaseSubComponent {
	constructor(t) {
		super(t),
			(this.Pe = void 0),
			(this.UPt = void 0),
			(this.APt = void 0),
			(this.eGe = void 0),
			(this.LPt = void 0),
			(this.PPt = void 0),
			(this.xPt = (t, e, i) => {
				const s = new VisionDetailDescItem(e);
				return (
					s.Init().finally(() => {
						s.Update(t), s.SetActive(!0);
					}),
					{ Key: i, Value: s }
				);
			}),
			(this.tpt = (t, e, i) => ({
				Key: i,
				Value: new ItemTipsAttribute_1.TipsAttributeItem(e, t),
			})),
			this.CreateThenShowByResourceIdAsync("UiItem_TipsVision", t);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIVerticalLayout],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIText],
			[8, UE.UIItem],
			[9, UE.UITexture],
			[10, UE.UIText],
			[11, UE.UIItem],
			[12, UE.UIVerticalLayout],
		];
	}
	async OnBeforeStartAsync() {
		(this.PPt = new VisionFetterSuitItem_1.VisionFetterSuitItem(
			this.GetItem(11),
		)),
			await this.PPt.Init();
	}
	OnStart() {
		var t = this.GetItem(2);
		(this.UPt = new ItemTipsLockButton_1.TipsLockButton(t)),
			(this.APt = new GenericLayoutNew_1.GenericLayoutNew(
				this.GetVerticalLayout(3),
				this.tpt,
			)),
			(this.eGe = new GenericLayoutNew_1.GenericLayoutNew(
				this.GetVerticalLayout(12),
				this.xPt,
			)),
			(t = this.GetItem(5));
		this.LPt = new ItemTipsGetWay_1.TipsGetWayPanel(t);
	}
	OnBeforeDestroy() {
		this.Pe &&
			((this.Pe = void 0),
			ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(void 0));
	}
	Refresh(t) {
		var e = () => {
			var t = this.Pe;
			this.GetText(0).SetText(t.Cost.toString()),
				this.GetText(1).SetUIActive(void 0 !== t.UpgradeLevel),
				this.GetText(1).SetText(t.UpgradeLevel),
				t.IncId && this.UPt.Refresh(t.IncId, t.CanClickLockButton),
				this.UPt?.SetUiActive(0 < t.IncId),
				this.APt.RebuildLayoutByDataNew(t.AttributeData),
				t.VisionDetailInfoComponentData.DataBase &&
					this.PPt.Update(
						t.VisionDetailInfoComponentData.DataBase.GetFetterGroupConfig(),
					),
				this.PPt.SetUiActive(
					void 0 !== t.VisionDetailInfoComponentData.DataBase,
				),
				this.wPt(t.VisionDetailInfoComponentData),
				this.DPt(t.GetWayData),
				this.RPt(t.LimitTimeTxt),
				this.BPt(t.IsEquip, t.EquippedId);
		};
		(this.Pe = t),
			ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(t),
			this.InAsyncLoading() ? this.OperationMap.set("Refresh", e) : e();
	}
	wPt(t) {
		this.eGe.RebuildLayoutByDataNew(t.DescData);
	}
	DPt(t) {
		this.GetItem(5).SetUIActive(void 0 !== t && 0 < t.length),
			t && this.LPt.Refresh(t);
	}
	RPt(t) {
		this.GetItem(6).SetUIActive(void 0 !== t),
			t && this.GetText(7).ShowTextNew(t);
	}
	BPt(t, e = void 0) {
		this.GetItem(8).SetUIActive(t),
			t &&
				void 0 !== e &&
				((t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)),
				this.SetRoleIcon(t.GetRoleConfig().RoleHeadIcon, this.GetTexture(9), e),
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(10),
					"VisionEquipping",
					t.GetName(),
				));
	}
	SetLockButtonShow(t) {
		var e = () => {
			this.GetItem(2).SetUIActive(t);
		};
		this.InAsyncLoading() ? this.OperationMap.set("SetLockButtonShow", e) : e();
	}
}
exports.TipsVisionComponent = TipsVisionComponent;
class VisionDetailDescItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.wqe = void 0),
			(this.Data = void 0),
			(this.PPt = void 0),
			(this.wqe = t);
	}
	async Init() {
		await this.CreateByActorAsync(this.wqe.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIText],
			[7, UE.UIItem],
			[8, UE.UIText],
			[9, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UIText],
			[12, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		(this.PPt = new VisionFetterSuitItem_1.VisionFetterSuitItem(
			this.GetItem(10),
		)),
			await this.PPt.Init(),
			this.PPt.SetActive(!0);
	}
	Update(t) {
		(this.Data = t),
			this.mGe(t),
			this.L4e(t),
			this.bPt(t),
			this.qPt(t),
			this.GPt(t),
			this.NPt(t),
			this.OPt(t);
	}
	mGe(t) {
		this.GetText(0).SetText(t.Title);
	}
	L4e(t) {
		var e,
			i,
			s = ModelManager_1.ModelManager.PhantomBattleModel.GetIfSimpleState(1);
		0 < t.FetterId
			? ((e =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(
						t.FetterId,
					)),
				(i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name)),
				this.GetText(2).SetText(i ?? ""),
				s
					? StringUtils_1.StringUtils.IsEmpty(e.SimplyEffectDesc)
						? this.GetText(3).SetText("")
						: LguiUtil_1.LguiUtil.SetLocalTextNew(
								this.GetText(3),
								e.SimplyEffectDesc,
							)
					: LguiUtil_1.LguiUtil.SetLocalTextNew(
							this.GetText(3),
							e.EffectDescription,
							...e.EffectDescriptionParam,
						),
				this.GetItem(12).SetUIActive(!0),
				this.GetText(2).SetUIActive(!0),
				this.GetText(3).SetUIActive(!0))
			: t.SkillConfig &&
				(s
					? StringUtils_1.StringUtils.IsEmpty(t.SkillConfig.SimplyDescription)
						? this.GetText(3).SetText("")
						: LguiUtil_1.LguiUtil.SetLocalTextNew(
								this.GetText(3),
								t.SkillConfig.SimplyDescription,
							)
					: ((i =
							ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescExBySkillIdAndQuality(
								t.SkillConfig.Id,
								t.Quality,
							)),
						LguiUtil_1.LguiUtil.SetLocalTextNew(
							this.GetText(3),
							t.SkillConfig.DescriptionEx,
							...i,
						)),
				this.GetItem(12).SetUIActive(!1),
				this.GetText(2).SetUIActive(!1),
				this.GetText(3).SetUIActive(!0));
	}
	OPt(t) {
		0 < t.FetterId
			? (this.GetItem(9).SetUIActive(!0),
				(t =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(
						t.FetterGroupId,
					)),
				this.PPt.Update(t),
				this.GetText(11).SetText(""))
			: this.GetItem(9).SetUIActive(!1);
	}
	bPt(t) {
		this.GetItem(4).SetUIActive(t.EmptyState);
	}
	GPt(t) {
		this.GetText(6).SetText(t.EmptyText);
	}
	NPt(t) {
		var e = !StringUtils_1.StringUtils.IsEmpty(t.EmptyContentText);
		this.GetItem(7).SetUIActive(e), this.GetText(8).SetText(t.EmptyContentText);
	}
	qPt(t) {
		this.GetItem(5).SetUIActive(t.TitleItemShowState);
	}
}
