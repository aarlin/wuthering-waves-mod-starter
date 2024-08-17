"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NpcIconComponent = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
	GameBudgetInterfaceController_1 = require("../../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	CameraController_1 = require("../../Camera/CameraController"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiActorPool_1 = require("../../Ui/UiActorPool"),
	UiLayer_1 = require("../../Ui/UiLayer"),
	UiManager_1 = require("../../Ui/UiManager"),
	UiModel_1 = require("../../Ui/UiModel"),
	GameBudgetAllocatorConfigCreator_1 = require("../../World/Define/GameBudgetAllocatorConfigCreator"),
	TrackController_1 = require("../Track/TrackController"),
	NpcIconComponentView_1 = require("./NpcIconComponentView");
class NpcIconComponent {
	constructor(e) {
		(this.Sbi = void 0),
			(this.n8 = ""),
			(this.HeadView = void 0),
			(this.Pe = void 0),
			(this.Ebi = -1),
			(this.Name = ""),
			(this.ybi = 0),
			(this.Ibi = 0),
			(this.Tbi = 0),
			(this.Lbi = void 0),
			(this.Dbi = void 0),
			(this.Rbi = 0),
			(this.Kr = !1),
			(this.yW = void 0),
			(this.Ubi = 0),
			(this.Abi = !1),
			(this.Lz = Vector_1.Vector.Create()),
			(this.ScheduledAfterTick = void 0),
			(this.Pbi = !1),
			(this.xbi = !0),
			(this.LocationProxyFunction = void 0),
			(this.Pe = e),
			(this.ybi =
				ConfigManager_1.ConfigManager.NpcIconConfig.NpcIconHeadInfoLimitMaxDistanceSquared);
	}
	RegisterTick() {
		this.yW &&
			(Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"HudUnit",
					37,
					"NpcIconComponent RegisterTick: 重复注册Tick",
					["NpcIconComponent", this.constructor.name],
					["Path", this.n8],
				),
			this.UnregisterTick());
		var e =
			GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
				.TsHUDTickConfig;
		this.yW =
			GameBudgetInterfaceController_1.GameBudgetInterfaceController.RegisterTick(
				e.GroupName,
				e.SignificanceGroup,
				this,
				this.Sbi?.Actor,
			);
	}
	UnregisterTick() {
		this.yW &&
			(GameBudgetInterfaceController_1.GameBudgetInterfaceController.UnregisterTick(
				this,
			),
			(this.yW = void 0));
	}
	ScheduledTick(e, t, i) {
		this.Tick(e * CommonDefine_1.MILLIONSECOND_PER_SECOND);
	}
	OnEnabledChange(e, t) {
		this.SetRootItemState(e);
	}
	get cot() {
		return this.Pbi || this.xbi;
	}
	OnWasRecentlyRenderedOnScreenChange(e) {
		this.Pbi = e;
	}
	OnNpcWasRecentlyRenderedOnScreenChange(e) {
		this.xbi = e;
	}
	SetupCheckRange(e) {
		this.ybi = e;
	}
	async AddNpcIconAsync(e) {
		return (
			UiManager_1.UiManager.IsInited ||
				((this.Lbi = new CustomPromise_1.CustomPromise()),
				(this.Dbi = () => {
					this.Lbi.SetResult(void 0),
						EventSystem_1.EventSystem.Remove(
							EventDefine_1.EEventName.UiManagerInit,
							this.Dbi,
						);
				}),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.UiManagerInit,
					this.Dbi,
				),
				await this.Lbi.Promise),
			this.CreateNpcIcon(e)
		);
	}
	async CreateNpcIcon(e) {
		var t;
		return (
			(this.n8 = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				"UiItem_NPCIcon_Prefab",
			)),
			(this.Sbi = await UiActorPool_1.UiActorPool.GetAsync(
				this.n8,
				UiLayer_1.UiLayer.WorldSpaceUiRootItem,
			)),
			this.Kr
				? (UiActorPool_1.UiActorPool.RecycleAsync(this.Sbi, this.n8), !1)
				: ((t = this.Pe.GetAttachToMeshComponent()),
					this.Sbi.Actor.K2_AttachToComponent(t, void 0, 2, 0, 1, !1),
					this.Sbi.Actor.SetActorHiddenInGame(!1),
					(this.HeadView = new NpcIconComponentView_1.NpcIconComponentView()),
					this.HeadView.SetNpcMessageId(e),
					UiModel_1.UiModel.AddNpcIconViewUnit(this.HeadView),
					await this.HeadView.CreateByActorAsync(this.Sbi.Actor),
					!this.Kr &&
						(this.HeadView.SetHeadInfoNameState(!1),
						this.HeadView.SetDialogueActive(!1),
						this.RegisterTick(),
						this.Tick(
							Time_1.Time.DeltaTime * CommonDefine_1.MILLIONSECOND_PER_SECOND,
							!0,
						),
						!0))
		);
	}
	SetCharacterIconLocation() {
		var e =
			((e = this.Pe.GetAttachToMeshComponent()).IsA(
				UE.StaticMeshComponent.StaticClass(),
			)
				? this.Lz.FromUeVector(e.K2_GetComponentLocation())
				: this.Pe.GetAttachToLocation(this.Lz),
			this.Pe.GetAddOffsetZ());
		e =
			ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcIconLocationOffsetZ() +
			e;
		this.HeadView.InitItemLocation(this.Lz.ToUeVector(), e);
	}
	SetCharacterName(e) {
		(this.Name = e ?? ""), this.HeadView?.SetNpcName(e);
	}
	SetCharacterSecondName() {
		this.HeadView?.SetNpcSecondName();
	}
	SetHeadItemState(e) {
		this.HeadView?.SetHeadItemState(e);
	}
	SetQuestTrackCellState(e) {
		this.HeadView?.SetQuestTrackCellState(e);
	}
	SetRootItemState(e) {
		this.HeadView?.SetRootItemState(e);
	}
	GetRootItemState() {
		return !!this.HeadView?.GetRootItemState();
	}
	SetHeadInfoNameState(e) {
		this.HeadView?.SetHeadInfoNameState(e);
	}
	SetQuestInfoState(e) {
		this.HeadView?.SetNpcQuestIconState(e);
	}
	SetQuestTrackEffectState(e) {
		this.HeadView?.SetTrackEffectState(e);
	}
	SetEntityPbDataId(e) {
		this.Ubi = e;
	}
	SetNpcQuest(e) {
		let t = "";
		void 0 !== e &&
			((t = (e = ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkConfig(e))
				.NpcTaskIcon),
			(this.Ibi = e.IconDistant)),
			this.HeadView?.SetNpcQuestIcon(t);
	}
	SetDialogueText(e, t = -1, i = !1) {
		(this.Ebi = t * CommonDefine_1.MILLIONSECOND_PER_SECOND),
			this.HeadView?.SetDialogueActive(!0, i),
			this.HeadView?.SetDialogueText(e),
			i && this.wbi(!0);
	}
	HideDialogueText() {
		(this.Ebi = -1), this.HeadView?.SetDialogueActive(!1), this.wbi(!1);
	}
	IsDialogueTextActive() {
		return this.HeadView?.GetDialogueActive() ?? !1;
	}
	wbi(e) {
		var t = ModelManager_1.ModelManager.TrackModel.IsTargetTracking(this.Ubi);
		t &&
			this.Abi &&
			(TrackController_1.TrackController.SetTrackMarkOccupied(5, t.Id, e),
			(this.Abi = e));
	}
	TickDialogueText(e) {
		this.Ebi < 0 || ((this.Ebi -= e), this.Ebi <= 0 && this.HideDialogueText());
	}
	Tick(e, t = !1) {
		this.Pe.CanTick(e) &&
			(t || this.cot) &&
			(this.Bbi(), this.TickDialogueText(e));
	}
	Bbi() {
		var e;
		ModelManager_1.ModelManager.CameraModel &&
			((e = Vector_1.Vector.DistSquared(
				ModelManager_1.ModelManager.CameraModel.CameraLocation,
				this.Pe.GetSelfLocation(),
			)),
			this.bbi(e),
			this.qbi());
	}
	qbi() {
		var e;
		this.HeadView &&
			(e = CameraController_1.CameraController.CameraRotator) &&
			this.HeadView.UpdateRotation(e.Yaw, e.Pitch);
	}
	Gbi(e) {
		var t = this.Pe.IsInHeadItemShowRange(
				e,
				this.ybi,
				ConfigManager_1.ConfigManager.NpcIconConfig
					.NpcIconHeadInfoLimitMinDistanceSquared,
			),
			i = ModelManager_1.ModelManager.TrackModel.IsTargetTracking(this.Ubi);
		this.SetQuestTrackCellState(i && 5 === i.TrackSource),
			this.SetHeadItemState(t),
			0 < this.Ebi &&
				(this.Rbi <
					ConfigManager_1.ConfigManager.NpcIconConfig
						.NpcIconHeadInfoLimitMinDistanceSquared ||
					this.Rbi > this.ybi) &&
				this.HideDialogueText(),
			t && this.Nbi(e);
	}
	Obi(e) {
		var t =
			ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcIconHeadInfoNameLimitDistance();
		return e <= t * t;
	}
	kbi(e) {
		this.Pe.IsShowNameInfo() &&
			((e = this.Obi(e)), this.SetHeadInfoNameState(e));
	}
	Fbi(e) {
		return 0 === this.Ibi || e <= this.Ibi * this.Ibi;
	}
	Vbi(e) {
		return 0 === this.Tbi || e <= this.Tbi * this.Tbi;
	}
	Hbi(e) {
		var t;
		this.Pe.IsShowQuestInfo() &&
			((t = this.Fbi(e)),
			this.SetQuestInfoState(t),
			(t = this.Vbi(e)),
			this.SetQuestTrackEffectState(t));
	}
	bbi(e) {
		this.Rbi !== e && ((this.Rbi = e), this.Gbi(e), this.kbi(e), this.Hbi(e));
	}
	Nbi(e) {
		(e = ConfigManager_1.ConfigManager.NpcIconConfig.GetHeadStateScaleValue(e)),
			this.HeadView?.SetHeadWorldScale3D(e);
	}
	Destroy() {
		(this.Kr = !0),
			this.HeadView &&
				(UiModel_1.UiModel.RemoveNpcIconViewUnit(this.HeadView),
				this.HeadView.Destroy(),
				(this.HeadView = void 0)),
			this.Sbi &&
				(this.Sbi.Actor?.DetachRootComponentFromParent(),
				UiActorPool_1.UiActorPool.RecycleAsync(this.Sbi, this.n8),
				(this.Sbi = void 0),
				(this.Pe = void 0)),
			this.UnregisterTick();
	}
}
exports.NpcIconComponent = NpcIconComponent;
