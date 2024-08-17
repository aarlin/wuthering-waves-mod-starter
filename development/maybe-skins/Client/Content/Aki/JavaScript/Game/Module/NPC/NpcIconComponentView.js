"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NpcIconComponentView = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EffectSystem_1 = require("../../Effect/EffectSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	UiLayer_1 = require("../../Ui/UiLayer"),
	LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
class NpcIconComponentView extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.RootActorRotation = void 0),
			(this.jbi = void 0),
			(this.Wbi = !1),
			(this.Kbi = !1),
			(this.Qbi = !1),
			(this.Xbi = !1),
			(this.$bi = !1),
			(this.Ybi = !1),
			(this.Jbi = void 0),
			(this.zbi = void 0),
			(this.IconPath = ""),
			(this.Zbi = void 0),
			(this.eqi = new UE.Vector(1, 1, 1)),
			(this.tqi = 0),
			(this.iqi = void 0),
			(this.oqi = void 0),
			(this.rqi = void 0),
			(this.nqi = new UE.Vector(1, 1, 1)),
			(this.sqi = 0),
			(this.aqi = void 0),
			(this.uct = 0),
			(this.CDi = void 0),
			(this.hqi = !1),
			(this.lqi = void 0),
			(this._qi = !1),
			(this.uqi = void 0),
			(this.cqi = (t) => {
				this.uqi?.(), (this.uqi = void 0);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UITexture],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[8, UE.UIItem],
			[10, UE.UIItem],
		];
	}
	OnStart() {
		(this.RootActorRotation = this.RootActor.K2_GetActorRotation()),
			(this.jbi = new UE.Vector(0, 0, 0)),
			(this.iqi = this.GetItem(6)),
			(this.tqi = this.iqi.K2_GetComponentScale().X),
			(this.aqi = this.GetItem(2)),
			(this.sqi = this.aqi.K2_GetComponentScale().X),
			(this.Jbi = this.GetItem(5)),
			(this.zbi = this.GetTexture(4)),
			(this.rqi = this.GetItem(8)),
			(this.oqi = this.GetItem(10)),
			(this.$bi = this.zbi.bIsUIActive),
			(this.Qbi = this.iqi.bIsUIActive),
			(this.Kbi = this.RootItem.bIsUIActive),
			(this.Wbi = this.Jbi.bIsUIActive),
			this.mqi(),
			this.SetDialogueActive(!1),
			this.dqi();
	}
	mqi() {
		(this.CDi = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			this.CDi.BindSequenceCloseEvent(this.cqi);
	}
	SetNpcName(t) {
		var i = this.GetText(0);
		StringUtils_1.StringUtils.IsEmpty(t)
			? i.SetUIActive(!1)
			: (i.SetUIActive(!0), i.SetText(t));
	}
	SetNpcQuestIcon(t) {
		(this.IconPath = t),
			StringUtils_1.StringUtils.IsEmpty(t)
				? this.dqi()
				: (this.SetTextureByPath(t, this.zbi), this.Cqi(!0), (this.lqi = 1));
	}
	InitItemLocation(t, i) {
		(this.jbi = t),
			(this.jbi.Z = t.Z + i),
			this.RootActor.K2_SetActorLocation(this.jbi, !1, void 0, !1);
	}
	UpdateRotation(t, i) {
		(t += 90),
			(this.RootActorRotation.Roll = i - 90),
			(this.RootActorRotation.Pitch = 0),
			(this.RootActorRotation.Yaw = t),
			this.RootItem.SetUIWorldRotation(this.RootActorRotation);
	}
	SetDialogueActive(t, i = !1) {
		t !== this.Ybi &&
			((this.Ybi = t)
				? (this.aqi.SetUIActive(!0),
					this.gqi("DialogueStart"),
					this.rqi.SetUIActive(i))
				: ((this.uqi = () => {
						this.aqi.SetUIActive(!1);
					}),
					this.gqi("DialogueClose") || this.uqi?.()));
	}
	GetDialogueActive() {
		return this.Ybi;
	}
	gqi(t) {
		return (
			this.CDi.GetCurrentSequence() === t
				? this.CDi.ReplaySequenceByKey(t)
				: (this.CDi.StopCurrentSequence(!1, !0),
					this.CDi.PlayLevelSequenceByName(t)),
			!0
		);
	}
	SetDialogueText(t) {
		this.GetText(3).SetText(t);
	}
	SetHeadItemState(t) {
		this.Qbi !== t &&
			((this.Qbi = t), this.iqi.SetUIActive(t), t) &&
			this.$bi &&
			!this.hqi &&
			0 === this.lqi &&
			(this.fqi(), (this.hqi = !1));
	}
	SetQuestTrackCellState(t) {
		this._qi !== t && ((this._qi = t), this.oqi.SetUIActive(t));
	}
	SetRootItemState(t) {
		this.Kbi !== t &&
			((this.Kbi = t), this.SetActive(t && !UiLayer_1.UiLayer.IsForceHideUi()));
	}
	GetRootItemState() {
		return this.Kbi;
	}
	SetTrackEffectState(t) {
		this.Xbi !== t &&
			((this.Xbi = t), EffectSystem_1.EffectSystem.IsValid(this.uct)) &&
			EffectSystem_1.EffectSystem.GetEffectActor(this.uct).SetActorHiddenInGame(
				t,
			);
	}
	SetHeadInfoNameState(t) {
		this.Wbi !== t &&
			((this.Wbi = t),
			this.Jbi.SetUIActive(t),
			this.aqi.SetUIActive(t && this.Ybi));
	}
	SetNpcQuestIconState(t) {
		this.Cqi(t);
	}
	SetNpcSecondName() {
		var t,
			i = this.GetText(1);
		this.Zbi &&
		(t = ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcHeadInfo(this.Zbi))
			.SecondName
			? (i.SetUIActive(!0), i.ShowTextNew(t.SecondName))
			: i.SetUIActive(!1);
	}
	dqi() {
		var t;
		this.Zbi &&
		(t = ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcHeadInfo(this.Zbi))
			.FunctionPath
			? (this.Cqi(!0),
				this.SetTextureByPath(t.FunctionPath, this.zbi),
				(this.lqi = 0))
			: this.Cqi(!1);
	}
	SetNpcMessageId(t) {
		this.Zbi = t;
	}
	SetHeadWorldScale3D(t) {
		this.Qbi &&
			this.tqi !== t &&
			((this.tqi = t),
			(this.eqi.X = t),
			(this.eqi.Y = t),
			(this.eqi.Z = t),
			this.iqi.SetWorldScale3D(this.eqi));
	}
	SetDialogWorldScale3D(t) {
		this.sqi !== t &&
			((this.sqi = t),
			(this.nqi.X = t),
			(this.nqi.Y = t),
			(this.nqi.Z = t),
			this.aqi.SetWorldScale3D(this.nqi));
	}
	fqi() {
		this.CDi.PlayLevelSequenceByName("FirstStart");
	}
	Cqi(t) {
		t !== this.$bi && ((this.$bi = t), this.zbi.SetUIActive(t));
	}
	OnBeforeDestroy() {
		EffectSystem_1.EffectSystem.IsValid(this.uct) &&
			(EffectSystem_1.EffectSystem.StopEffectById(
				this.uct,
				"[NpcIconComponentView.OnBeforeDestroy]",
				!0,
			),
			(this.uct = 0)),
			this.CDi?.Clear();
	}
}
exports.NpcIconComponentView = NpcIconComponentView;
