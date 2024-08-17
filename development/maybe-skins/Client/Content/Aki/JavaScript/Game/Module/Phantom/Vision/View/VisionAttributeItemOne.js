"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionAttributeItemOne = exports.VisionAttributeVariantOneData =
		void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	GenericScrollView_1 = require("../../../Util/ScrollView/GenericScrollView");
class VisionAttributeVariantOneData {
	constructor() {
		(this.Title = ""), (this.Desc = void 0), (this.SkillId = 0);
	}
}
exports.VisionAttributeVariantOneData = VisionAttributeVariantOneData;
class VisionAttributeItemOne extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.LoadingPromise = new CustomPromise_1.CustomPromise()),
			(this.g6i = void 0),
			(this.EPe = void 0),
			(this.kGe = void 0),
			(this.f6i = 0),
			(this.p6i = void 0),
			(this.JGe = (e, t, i) => (
				(t = new AttributeSkillStateItem(t)).Update(
					this.g6i,
					e,
					this.f6i - 1 === i,
				),
				{ Key: i, Value: t }
			)),
			(this.v6i = (e) => {
				e === this.g6i?.GetUniqueId() &&
					this.Refresh(this.g6i.GetUniqueId(), !1);
			}),
			(this.kqe = () => {}),
			this.CreateThenShowByResourceIdAsync("UiItem_VisionIAttriItemA", e);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIScrollViewWithScrollbarComponent],
		];
	}
	OnStart() {
		(this.p6i = new VisionAttributeSkillButton(this.GetItem(0))),
			this.p6i.SetOnClickCall(this.kqe),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.GetItem(0),
			)),
			this.AddEventListener(),
			(this.kGe = new GenericScrollView_1.GenericScrollView(
				this.GetScrollViewWithScrollbar(1),
				this.JGe,
			));
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.PhantomPersonalSkillActive,
			this.v6i,
		);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.PhantomPersonalSkillActive,
			this.v6i,
		);
	}
	RefreshButtonShowState(e) {
		this.GetItem(0).SetUIActive(e);
	}
	M6i() {
		var e = new VisionAttributeVariantOneData();
		return (
			(e.Desc = this.g6i.GetNormalSkillDesc()),
			(e.SkillId = this.g6i.GetNormalSkillId()),
			e
		);
	}
	S6i() {
		var e = new Array();
		return (
			this.g6i.GetUniqueId() < 0 || this.g6i.GetPersonalSkillId(),
			e.push(this.M6i()),
			e
		);
	}
	Refresh(e, t = !0) {
		this.g6i =
			ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e);
		var i =
			ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsEquip(e);
		this.RefreshButtonShowState(
			i &&
				0 < e &&
				0 < this.g6i.GetPersonalSkillId() &&
				ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(e) &&
				!1,
		),
			(i = this.S6i());
		(this.f6i = i.length), this.kGe.RefreshByData(i), this.E6i(t), this.y6i();
	}
	y6i() {
		0 < this.g6i.GetPersonalSkillId() && this.p6i.Update(this.g6i);
	}
	E6i(e = !0) {
		var t = this.g6i.GetUniqueId();
		let i = !1;
		(i =
			0 < this.g6i.GetPersonalSkillId()
				? ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(t)
					? this.g6i.GetIfActivePersonalSkill()
					: ModelManager_1.ModelManager.PhantomBattleModel.GetIfVisionSkillState(
							t,
						)
				: i)
			? this.EPe.PlaySequencePurely("ClickR")
			: this.EPe.PlaySequencePurely("ClickL"),
			e && this.EPe.StopCurrentSequence(!1, e);
	}
	OnBeforeDestroy() {
		this.kGe.ClearChildren(), this.RemoveEventListener();
	}
}
exports.VisionAttributeItemOne = VisionAttributeItemOne;
class VisionAttributeSkillButton extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.I6i = void 0),
			(this.nqe = () => {
				this.I6i?.();
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.nqe]]);
	}
	SetOnClickCall(e) {
		this.I6i = e;
	}
	Update(e) {
		this.T6i(e), this.hke(e);
	}
	hke(e) {
		var t = e.GetUniqueId();
		ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(t)
			? ((e = e.GetIfActivePersonalSkill()),
				LguiUtil_1.LguiUtil.SetLocalText(
					this.GetText(4),
					e ? "VisionSpecialSkill" : "VisionNormalSkill",
				))
			: ((e =
					ModelManager_1.ModelManager.PhantomBattleModel.GetIfVisionSkillState(
						t,
					)),
				LguiUtil_1.LguiUtil.SetLocalText(
					this.GetText(4),
					e ? "VisionSpecialSkill" : "VisionNormalSkill",
				));
	}
	T6i(e) {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), "VisionNormalSkill"),
			this.GetItem(1).SetUIActive(!1),
			this.GetItem(2).SetUIActive(!1),
			this.GetItem(3).SetUIActive(!1);
	}
}
class AttributeSkillStateItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIItem],
		];
	}
	Update(e, t, i) {
		this.L6i(e, t),
			this.GetItem(5).SetUIActive(!i),
			this.hke(t),
			this.D6i(e, t);
	}
	L6i(e, t) {
		var i = e.GetUniqueId();
		ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsEquip(i)
			? this.R6i(e, t)
				? this.GetItem(0).SetUIActive(!0)
				: ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(i)
					? this.GetItem(0).SetUIActive(!1)
					: (this.GetItem(0).SetUIActive(!0),
						LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "VisionNotMain"))
			: this.GetItem(0).SetUIActive(!1);
	}
	hke(e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			this.GetText(4),
			e.Desc.MainSkillText,
			...e.Desc.MainSkillParameter,
		);
	}
	R6i(e, t) {
		return t.SkillId === e.GetPersonalSkillId() && 0 < t.SkillId;
	}
	D6i(e, t) {
		var i = e.GetUniqueId(),
			n = ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsEquip(i);
		n &&
		ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(i) &&
		!this.R6i(e, t) &&
		n
			? (this.GetItem(2).SetUIActive(!0),
				LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "ItemEquiped"))
			: this.GetItem(2).SetUIActive(!1);
	}
}
