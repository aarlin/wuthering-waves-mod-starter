"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, o) {
		var r,
			i = arguments.length,
			a =
				i < 3
					? t
					: null === o
						? (o = Object.getOwnPropertyDescriptor(t, n))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			a = Reflect.decorate(e, t, n, o);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(r = e[s]) && (a = (i < 3 ? r(a) : 3 < i ? r(t, n, a) : r(t, n)) || a);
		return 3 < i && a && Object.defineProperty(t, n, a), a;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PawnHeadInfoComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	GeneralLogicTreeUtil_1 = require("../../../../Module/GeneralLogicTree/GeneralLogicTreeUtil"),
	NpcIconComponent_1 = require("../../../../Module/NPC/NpcIconComponent"),
	UiModel_1 = require("../../../../Ui/UiModel"),
	CharacterActorComponent_1 = require("./CharacterActorComponent"),
	CHECK_QUEST_ICON_INTERVAL = 1e3;
let PawnHeadInfoComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.Hte = void 0),
			(this.zJr = void 0),
			(this.ZJr = void 0),
			(this.ezr = void 0),
			(this.tzr = void 0),
			(this.hir = void 0),
			(this.izr = !1),
			(this.ozr = !1),
			(this.j9s = !0),
			(this.e8 = 0),
			(this.rzr = !1),
			(this.I6s = () => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("HudUnit", 51, "开始角色头顶组件初始化", [
						"PbDataId",
						this.Hte?.CreatureData.GetPbDataId(),
					]),
					EventSystem_1.EventSystem.RemoveWithTarget(
						this.Entity,
						EventDefine_1.EEventName.CharBornFinished,
						this.I6s,
					),
					this.T6s();
			}),
			(this.nzr = () => {
				this.szr(), this.azr();
			}),
			(this.OnEntityWasRecentlyRenderedOnScreenChange = (e) => {
				if (this.hzr() === Protocol_1.Aki.Protocol.wks.Proto_SceneItem) {
					var t = this.Hte;
					if (
						!t ||
						0 === t.PrefabRadius ||
						t.CurLevelPrefabShowActor?.IsA(UE.TsEffectActor_C.StaticClass())
					)
						return void this.hir?.OnNpcWasRecentlyRenderedOnScreenChange(!0);
				}
				this.hir?.OnNpcWasRecentlyRenderedOnScreenChange(e);
			}),
			(this.jJe = (e, t) => {
				this.lzr();
			}),
			(this._zr = () => {
				this.hir?.SetRootItemState(!1);
			}),
			(this.uzr = () => {
				if (this.hir)
					if (this.ezr) {
						var e = this.ezr.GetInteractController();
						if (e)
							if (
								(e = e.Options.find(
									(e) =>
										!!e.Context &&
										(2 === e.Context.Type || 6 === e.Context.Type) &&
										ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
											e.Condition,
											this.Hte.Owner,
										),
								))
							) {
								var t = e.Context;
								let r;
								switch (t.Type) {
									case 2:
										(o = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
											t.QuestId,
										)) &&
											!o.HideAcceptQuestMark &&
											(r = o.QuestMarkId);
										break;
									case 6:
										var n, o;
										(o =
											ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
												t.TreeIncId,
											)) &&
											o.BtType ===
												Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
											(n = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
												t.TreeConfigId,
											)) &&
											4 === n.Type &&
											(n = o.GetNode(t.NodeId)) &&
											n.ContainTag(0) &&
											(r = o.GetTrackIconId());
								}
								this.hir.SetNpcQuest(r);
							} else this.hir.SetNpcQuest();
					} else this.hir.SetNpcQuest();
			});
	}
	static get Dependencies() {
		return [1, 0];
	}
	OnStart() {
		return (
			(this.zJr = this.Entity.GetComponent(102)),
			(this.Hte = this.Entity.GetComponent(1)),
			(this.ZJr = this.Entity.GetComponent(104)),
			(this.ezr = this.Entity.GetComponent(178)),
			(this.tzr = Vector_1.Vector.Create()),
			this.pie(),
			this.Hte instanceof CharacterActorComponent_1.CharacterActorComponent
				? EventSystem_1.EventSystem.AddWithTarget(
						this.Entity,
						EventDefine_1.EEventName.CharBornFinished,
						this.I6s,
					)
				: this.T6s(),
			!0
		);
	}
	pie() {
		var e = this.Hte.CreatureData;
		e && ((e = e.GetBaseInfo()), (this.ozr = e?.IsShowNameOnHead ?? !1));
	}
	T6s() {
		this.zJr?.GetMessageId()
			? this.azr()
			: (this.rzr = EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.EnterPresentationInitRange,
					this.nzr,
				));
	}
	azr() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.TextLanguageChange,
			this.jJe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.DisActiveBattleView,
				this._zr,
			),
			this.CreateCharacterIconComponentView();
	}
	szr() {
		this.rzr &&
			((this.rzr = !1),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.EnterPresentationInitRange,
				this.nzr,
			));
	}
	OnEnd() {
		return (
			this.szr(),
			this.hir &&
				(EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.TextLanguageChange,
					this.jJe,
				),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.DisActiveBattleView,
					this._zr,
				),
				this.hir.Destroy()),
			!0
		);
	}
	CreateCharacterIconComponentView() {
		(this.hir = new NpcIconComponent_1.NpcIconComponent(this)),
			this.hir.AddNpcIconAsync(this.zJr?.GetMessageId()).then(() => {
				this.czr();
			});
		var e = this.Entity.GetComponent(0).GetPbDataId();
		this.hir.SetEntityPbDataId(e);
	}
	czr() {
		this.SetCharacterIconLocation(),
			this.lzr(),
			this.SetCharacterSecondName(),
			this.hir.SetNpcQuest();
	}
	SetCharacterIconLocation() {
		this.hir?.SetCharacterIconLocation();
	}
	lzr() {
		var e = this.zJr?.PawnName;
		this.hir?.SetCharacterName(e);
	}
	SetCharacterSecondName() {
		this.hir?.SetCharacterSecondName();
	}
	OnEnable() {
		this.hir?.SetHeadItemState(!0);
	}
	OnDisable() {
		this.hir?.SetHeadItemState(!1);
	}
	hzr() {
		return this.Entity.GetComponent(0).GetEntityType();
	}
	OnTick(e) {
		super.OnTick(e),
			(this.e8 += e),
			this.e8 > 1e3 && ((this.e8 -= 1e3), this.uzr());
	}
	SetDialogueText(e, t = -1, n = !1) {
		(e =
			ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(e, !0) ??
			""),
			this.hir?.SetDialogueText(e, t, n);
	}
	HideDialogueText() {
		this.hir?.HideDialogueText();
	}
	GetSelfLocation() {
		return this.Hte.ActorLocationProxy;
	}
	GetAttachToMeshComponent() {
		return this.hzr() === Protocol_1.Aki.Protocol.wks.Proto_SceneItem
			? this.Hte.GetStaticMeshComponent()
			: this.Hte.SkeletalMesh;
	}
	GetAttachToSocketName() {
		return (
			this.zJr?.GetHeadStateSocketName() ??
			ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcIconSocketName()
		);
	}
	GetAttachToLocation(e) {
		var t,
			n,
			o = this.Hte;
		o
			? ((t = this.Hte.SkeletalMesh.K2_GetComponentToWorld().GetLocation()),
				(n = o.ActorLocationProxy),
				e.Set(n.X, n.Y, n.Z + o.HalfHeight),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"HudUnit",
						51,
						"获取根头顶组件位置",
						["PbDataId", this.Hte?.CreatureData.GetPbDataId()],
						["RootLocation", e],
						["ActorLocation", n],
						["MeshLocation", t],
					))
			: e.FromUeVector(this.Hte.SkeletalMesh.K2_GetComponentLocation());
	}
	GetAddOffsetZ() {
		return this.zJr?.GetHeadStateOffset() ?? 0;
	}
	IsShowNameInfo() {
		return this.ozr;
	}
	IsShowQuestInfo() {
		return this.izr;
	}
	IsDialogTextActive() {
		return this.hir?.IsDialogueTextActive() ?? !1;
	}
	CanTick() {
		return (
			!!this.ZJr &&
			(this.j9s &&
			!ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() &&
			UiModel_1.UiModel.IsInMainView
				? (this.hir?.SetRootItemState(!0), !0)
				: (this.hir?.SetRootItemState(!1), !1))
		);
	}
	IsInHeadItemShowRange(e, t, n) {
		var o = this.Entity.GetComponent(0)?.GetPbDataId();
		if (
			(o = ModelManager_1.ModelManager.TrackModel.IsTargetTracking(o)) &&
			1 !== o.TrackSource
		) {
			var r = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
			if (r)
				return (
					this.tzr.DeepCopy(this.GetSelfLocation()),
					Vector_1.Vector.DistSquared(r, this.tzr) <
						o.TrackHideDis * o.TrackHideDis * 100 * 100
				);
		}
		return e < t && n < e;
	}
	GetRootItemState() {
		return !!this.hir?.GetRootItemState();
	}
	EnableHeadInfo(e) {
		this.j9s !== e && (this.j9s = e);
	}
};
(PawnHeadInfoComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(70)],
	PawnHeadInfoComponent,
)),
	(exports.PawnHeadInfoComponent = PawnHeadInfoComponent);
