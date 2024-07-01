"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionDetailDescComponent = exports.VisionDetailDesc = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	HelpController_1 = require("../../../Help/HelpController"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	VisionFetterSuitItem_1 = require("./VisionFetterSuitItem"),
	NORMALCOLOR = "EBE5D7FF",
	GREENCOLOR = "97FF86FF",
	GRAYCOLOR = "ADADADFF",
	COUNTERHELPID = 59;
class VisionDetailDesc {
	constructor() {
		(this.Title = ""),
			(this.TitleItemShowState = !0),
			(this.JumpCallBack = void 0),
			(this.NeedActiveState = !1),
			(this.GreenActiveState = !1),
			(this.NewState = !1),
			(this.FetterId = 0),
			(this.FetterData = void 0),
			(this.IfMainPosition = !1),
			(this.EmptyState = !1),
			(this.EmptyText = ""),
			(this.EmptyContentText = ""),
			(this.SkillConfig = void 0),
			(this.Level = 0),
			(this.FetterGroupId = 0),
			(this.$6i = !0),
			(this.DoNotNeedCheckSimplyState = !1),
			(this.NeedSimplyStateChangeAnimation = !1),
			(this.AnimationState = !0),
			(this.Quality = 0),
			(this.TitleType = -1),
			(this.EquipSameMonster = !1),
			(this.CompareState = !1);
	}
	SetNeedCheckChangeColor(e) {
		this.$6i = e;
	}
	GetNeedCheckChangeColor() {
		return this.$6i;
	}
	static CreateEmptySkillDescData() {
		var e = new Array(),
			t = new VisionDetailDesc();
		return (
			(t.TitleItemShowState = !0),
			(t.Title =
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"VisionSkillTitle",
				) ?? ""),
			(t.EmptyState = !0),
			(t.EmptyText =
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"MainVisionEmpty",
				) ?? ""),
			(t.TitleType = 0),
			e.push(t),
			e
		);
	}
	static CreateEmptyFetterDescData() {
		var e = new Array(),
			t = new VisionDetailDesc();
		return (
			(t.TitleItemShowState = !0),
			(t.Title =
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"VisionFetterTitle",
				) ?? ""),
			(t.EmptyState = !0),
			(t.EmptyText =
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew("FetterEmpty") ??
				""),
			(t.TitleType = 1),
			e.push(t),
			e
		);
	}
	static CreateSameMonsterTips() {
		var e = new Array(),
			t = new VisionDetailDesc();
		return (
			(t.Title =
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"VisionFetterTitle",
				) ?? ""),
			(t.EquipSameMonster = !0),
			(t.TitleItemShowState = !1),
			e.push(t),
			e
		);
	}
	static ConvertVisionSkillDescToDescData(e, t, i, n, s) {
		var a = new Array(),
			o = new VisionDetailDesc();
		return (
			(t =
				((o.TitleItemShowState = !0),
				(o.SkillConfig = e),
				(o.Level = t),
				(o.Quality = s),
				(o.IfMainPosition = i && !n),
				(o.NeedActiveState = !0),
				(o.GreenActiveState = !(!i || n)),
				e.IfCounterSkill))
				? ((o.JumpCallBack = () => {
						HelpController_1.HelpController.OpenHelpById(59);
					}),
					(o.Title =
						MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
							"VisionCounterSkillText",
						) ?? ""))
				: (o.Title =
						MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
							"VisionSkillTitle",
						) ?? ""),
			a.push(o),
			a
		);
	}
	static ConvertVisionFetterDataToDetailDescData(e, t, i = void 0) {
		var n = new Array(),
			s = e.length;
		for (let o = 0; o < s; o++) {
			var a = new VisionDetailDesc();
			1 <= o && (a.TitleItemShowState = !1),
				(a.Title =
					MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						"VisionFetterTitle",
					) ?? ""),
				(a.NeedActiveState = !0),
				(a.NewState = e[o].NewAdd),
				(a.EquipSameMonster = t),
				e[o].ActiveState || e[o].NewAdd
					? (a.GreenActiveState = !0)
					: (a.GreenActiveState = !1),
				(a.FetterGroupId = e[o].FetterGroupId),
				(a.FetterId = e[o].FetterId),
				(a.FetterData = e[o]),
				(a.JumpCallBack = i),
				n.push(a);
		}
		return n;
	}
}
exports.VisionDetailDesc = VisionDetailDesc;
class VisionDetailDescComponent extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.wqe = void 0),
			(this.Y6i = void 0),
			(this.J6i = void 0),
			(this.z6i = void 0),
			(this.Z6i = !1),
			(this.e8i = () => {
				this.Z6i &&
					this.GetScrollViewWithScrollbar(0)?.ScrollTo(this.GetItem(2));
			}),
			(this.t8i = () => {
				this.Y6i &&
					(this.Y6i.forEach((e) => {
						e.NeedSimplyStateChangeAnimation = !0;
					}),
					this.Refresh(this.Y6i, !0));
			}),
			(this.i8i = () => {
				this.Z6i = !1;
			}),
			(this.wqe = e);
	}
	async Init() {
		await this.CreateByActorAsync(this.wqe.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIScrollViewWithScrollbarComponent],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIVerticalLayout],
		];
	}
	async OnBeforeStartAsync() {
		(this.J6i = new VisionDetailDescItem(this.GetItem(1))),
			await this.J6i.Init(),
			this.J6i.SetActive(!0),
			(this.z6i = new VisionDetailDescItem(this.GetItem(2))),
			await this.z6i.Init(),
			this.z6i.SetActive(!0),
			this.GetVerticalLayout(3)?.OnRebuildLayoutDelegate.Bind(this.e8i);
	}
	OnStart() {
		this.mEe();
	}
	GetTxtItemByIndex(e) {
		return 0 === e
			? this.GetItem(1)
			: 1 === e
				? ((this.Z6i = !0), this.GetItem(2))
				: void 0;
	}
	mEe() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ChangeVisionSimplyState,
			this.t8i,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GuideGroupFinished,
				this.i8i,
			);
	}
	dEe() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.ChangeVisionSimplyState,
			this.t8i,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GuideGroupFinished,
				this.i8i,
			);
	}
	Refresh(e, t = 0) {
		this.Y6i = e;
		const i = new Array(),
			n = new Array();
		e.forEach((e) => {
			(e.SkillConfig || (e.TitleItemShowState && 0 === e.TitleType)) &&
				i.push(e),
				(0 < e.FetterId ||
					(e.TitleItemShowState && 1 === e.TitleType) ||
					e.EquipSameMonster) &&
					n.push(e);
		}),
			this.J6i?.Update(i),
			this.z6i?.Update(n),
			e.forEach((e) => {
				e.NeedSimplyStateChangeAnimation = !1;
			});
	}
	OnBeforeDestroy() {
		this.dEe();
	}
}
exports.VisionDetailDescComponent = VisionDetailDescComponent;
class VisionDetailDescItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.wqe = void 0),
			(this.CurrentData = void 0),
			(this.Pe = void 0),
			(this.eGe = void 0),
			(this.sGe = () => new VisionDetailDescContentItem()),
			(this.o8i = () => {
				this.Pe && this.Pe.JumpCallBack && this.Pe.JumpCallBack();
			}),
			(this.wqe = e);
	}
	Clear() {}
	async Init() {
		await this.CreateByActorAsync(this.wqe.GetOwner()), this.SetUiActive(!0);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIButtonComponent],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIText],
			[6, UE.UIItem],
			[7, UE.UIVerticalLayout],
			[8, UE.UIItem],
		]),
			(this.BtnBindInfo = [[1, this.o8i]]);
	}
	OnStart() {
		(this.eGe = new GenericLayout_1.GenericLayout(
			this.GetVerticalLayout(7),
			this.sGe,
		)),
			this.GetItem(3).SetUIActive(!1);
	}
	Update(e) {
		let t;
		const i = new Array();
		e.forEach((e) => {
			(e.SkillConfig || (e.TitleItemShowState && 0 === e.TitleType)) &&
				(t = e).SkillConfig &&
				i.push(t),
				(0 < e.FetterId ||
					(e.TitleItemShowState && 1 === e.TitleType) ||
					e.EquipSameMonster) &&
					(e.TitleItemShowState && (t = e),
					0 < e.FetterId || e.EquipSameMonster) &&
					i.push(e);
		}),
			(this.Pe = t) &&
				(this.mGe(t),
				this.r8i(t),
				this.bPt(t),
				this.qPt(t),
				this.NPt(t),
				this.Pqe(i));
	}
	Pqe(e) {
		this.eGe?.RefreshByData(e);
	}
	mGe(e) {
		this.GetText(0).SetText(e.Title);
	}
	r8i(e) {
		this.GetButton(1).RootUIComp.SetUIActive(
			void 0 !== e.JumpCallBack && !e.CompareState,
		);
	}
	bPt(e) {
		this.GetItem(2).SetUIActive(e.EmptyState),
			e.EmptyState && this.GetItem(8).SetUIActive(0 === e.TitleType);
	}
	NPt(e) {
		this.GetText(5).SetText(e.EmptyText);
	}
	qPt(e) {
		this.GetItem(4).SetUIActive(e.TitleItemShowState);
	}
}
class VisionDetailDescContentItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.EPe = void 0),
			(this.n8i = !0),
			(this.ScrollViewDelegate = void 0),
			(this.GridIndex = 0),
			(this.DisplayIndex = 0),
			(this.CurrentData = void 0),
			(this.PPt = void 0),
			(this.Pe = void 0);
	}
	Refresh(e, t, i) {
		this.Update(e);
	}
	Clear() {
		this.OnClear();
	}
	OnClear() {}
	OnSelected(e) {}
	OnDeselected(e) {}
	GetKey(e, t) {
		return this.GridIndex;
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIText],
			[6, UE.UIText],
			[5, UE.UIItem],
			[1, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIText],
			[10, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		(this.PPt = new VisionFetterSuitItem_1.VisionFetterSuitItem(
			this.GetItem(5),
		)),
			await this.PPt.Init(),
			this.PPt.SetActive(!0),
			this.SetUiActive(!0);
	}
	OnStart() {
		this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(7));
	}
	Update(e) {
		(this.Pe = e),
			this.Pe &&
				(this.s8i(e),
				this.a8i(e),
				this.L4e(e),
				this.OPt(e),
				this.h8i(e),
				this.l8i(e),
				this._8i(e));
	}
	_8i(e) {
		e.NeedSimplyStateChangeAnimation &&
			e.AnimationState &&
			(this.EPe.StopSequenceByKey("Switch", !1, !0),
			this.EPe.PlayLevelSequenceByName("Switch"));
	}
	l8i(e) {
		if (this.n8i && e.AnimationState) {
			let i,
				n = !1;
			e.GreenActiveState &&
				e.NewState &&
				0 < e.FetterId &&
				((i = "Choose"), (n = !0)),
				0 < e.FetterId && !n && e.FetterData.ActiveState && (i = "Activate");
			var t = this.EPe.GetCurrentSequence();
			void 0 !== t && i !== t && this.EPe.StopSequenceByKey(t, !1, !0),
				void 0 !== i &&
					(i !== t
						? this.EPe.PlayLevelSequenceByName(i)
						: this.EPe.ReplaySequenceByKey(i)),
				this.GetItem(10)?.SetUIActive(e.EquipSameMonster && void 0 === i);
		} else this.GetItem(10)?.SetUIActive(e.EquipSameMonster);
	}
	a8i(e) {
		this.GetItem(0).SetUIActive(e.NeedActiveState || e.EquipSameMonster);
	}
	s8i(e) {
		e.NeedActiveState
			? this.GetItem(2).SetUIActive(e.GreenActiveState)
			: e.EquipSameMonster && this.GetItem(2).SetUIActive(!1);
	}
	h8i(e) {
		(e.GreenActiveState && !e.NewState && 0 < e.FetterId) ||
		e.EquipSameMonster ||
		(e.GreenActiveState && e.SkillConfig)
			? this.GetItem(1).SetUIActive(!1)
			: this.GetItem(1).SetUIActive(!0);
	}
	OPt(e) {
		if (0 < e.FetterId) {
			this.GetItem(5).SetUIActive(!0);
			var t =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(
					e.FetterGroupId,
				);
			(t =
				(this.PPt.Update(t),
				e.FetterData.ActiveFetterGroupNum > e.FetterData.NeedActiveNum
					? e.FetterData.NeedActiveNum
					: e.FetterData.ActiveFetterGroupNum)),
				(t = StringUtils_1.StringUtils.Format(
					"({0}/{1})",
					t.toString(),
					e.FetterData.NeedActiveNum.toString(),
				));
			let i = "EBE5D7FF";
			(i = e.FetterData.ActiveState ? "97FF86FF" : GRAYCOLOR),
				this.GetText(9).SetText(t),
				this.GetText(9).SetColor(UE.Color.FromHex(i));
		} else this.GetItem(5).SetUIActive(!1);
	}
	L4e(e) {
		if (!e.EquipSameMonster || 0 < e.FetterId) {
			let n =
				ModelManager_1.ModelManager.PhantomBattleModel.GetIfSimpleState(1);
			if (((n = !n), e.DoNotNeedCheckSimplyState && (n = !0), 0 < e.FetterId)) {
				var t =
						ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(
							e.FetterId,
						),
					i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name) ?? "";
				if (
					(this.GetText(4).SetText(i),
					n
						? StringUtils_1.StringUtils.IsEmpty(t.SimplyEffectDesc)
							? this.GetText(6).SetText("")
							: LguiUtil_1.LguiUtil.SetLocalTextNew(
									this.GetText(6),
									t.SimplyEffectDesc,
								)
						: LguiUtil_1.LguiUtil.SetLocalTextNew(
								this.GetText(6),
								t.EffectDescription,
								...t.EffectDescriptionParam,
							),
					this.GetText(4).SetUIActive(!0),
					this.GetText(6).SetUIActive(!0),
					e.GetNeedCheckChangeColor())
				) {
					let t = "EBE5D7FF";
					(t = e.FetterData.ActiveState ? "97FF86FF" : GRAYCOLOR),
						this.GetText(4).SetColor(UE.Color.FromHex(t)),
						this.GetText(6).SetColor(UE.Color.FromHex(t));
				}
			} else if (
				e.SkillConfig &&
				(n
					? StringUtils_1.StringUtils.IsEmpty(e.SkillConfig.SimplyDescription)
						? this.GetText(6).SetText("")
						: LguiUtil_1.LguiUtil.SetLocalTextNew(
								this.GetText(6),
								e.SkillConfig.SimplyDescription,
							)
					: ((i =
							ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescExBySkillIdAndQuality(
								e.SkillConfig.Id,
								e.Quality,
							)),
						LguiUtil_1.LguiUtil.SetLocalTextNew(
							this.GetText(6),
							e.SkillConfig.DescriptionEx,
							...i,
						)),
				this.GetItem(8).SetUIActive(!1),
				this.GetText(6).SetUIActive(!0),
				e.GetNeedCheckChangeColor())
			) {
				let t = GRAYCOLOR;
				e.IfMainPosition && (t = "97FF86FF"),
					this.GetText(6).SetColor(UE.Color.FromHex(t));
			}
		} else
			(t = this.GetText(6)),
				this.GetItem(8).SetUIActive(!1),
				t.SetUIActive(!0),
				this.GetText(4).SetUIActive(!1),
				t.SetColor(UE.Color.FromHex(GRAYCOLOR)),
				LguiUtil_1.LguiUtil.SetLocalTextNew(t, "SameVisionNoCountValue");
	}
	OnBeforeHide() {
		this.EPe.StopCurrentSequence();
	}
}
