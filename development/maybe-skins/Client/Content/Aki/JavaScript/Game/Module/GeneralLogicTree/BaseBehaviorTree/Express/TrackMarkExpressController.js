"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TrackMarkExpressController = exports.TrackVision = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	CharacterController_1 = require("../../../../NewWorld/Character/CharacterController"),
	MapController_1 = require("../../../Map/Controller/MapController"),
	MapDefine_1 = require("../../../Map/MapDefine"),
	TrackController_1 = require("../../../Track/TrackController"),
	GeneralLogicTreeUtil_1 = require("../../GeneralLogicTreeUtil"),
	INVALID_MARKID = 0;
class TrackVision {
	constructor() {
		(this.VisionOwnerId = 0),
			(this.DungeonId = 0),
			(this.ConfigIndex = 0),
			(this.EntityId = 0);
	}
}
exports.TrackVision = TrackVision;
class TrackMarkExpressController {
	constructor(e) {
		(this.JKt = void 0),
			(this.Yre = void 0),
			(this.Yre = e),
			(this.JKt = new Map());
	}
	Clear() {
		for (var [, e] of this.JKt) e.Destroy();
		this.JKt.clear();
	}
	NodeTrackMarkStart(e, t, r, i) {
		this.FKt(e, t, r).OnNodeStart(i);
	}
	NodeTrackMarkEnd(e) {
		this.GetNodeTrackMarkCreator(e)?.OnNodeEnd(), this.JKt.delete(e);
	}
	FKt(e, t, r) {
		var i = this.GetNodeTrackMarkCreator(e);
		return (
			i ||
			((i = new NodeTrackMark(t, t.TreeIncId, t.TreeConfigId, e)).Init(r),
			this.JKt.set(e, i),
			i)
		);
	}
	GetNodeTrackMarkCreator(e) {
		return this.JKt.get(e);
	}
	DestroyNodeTrackMarkCreator(e) {
		this.GetNodeTrackMarkCreator(e)?.Destroy(), this.JKt.delete(e);
	}
	EnableTrack(e) {
		for (var [, t] of this.JKt) t.EnableTrack(e);
	}
	CreateMapMarks() {
		for (var [, e] of this.JKt) e.CreateMapMarks();
	}
	UpdateTrackMarkExpression(e, t, r) {
		switch (r) {
			case Protocol_1.Aki.Protocol.N2s.Lkn:
				var i;
				"ChildQuest" !== t.NodeType &&
					(i = t.TrackTarget) &&
					t.ContainTag(0) &&
					this.NodeTrackMarkStart(t.NodeId, e, i, e.IsOccupied);
				break;
			case Protocol_1.Aki.Protocol.N2s.Proto_CompletedSuccess:
			case Protocol_1.Aki.Protocol.N2s.Proto_CompletedFailed:
				("ChildQuest" === t.NodeType && t.IsFinished) ||
					this.NodeTrackMarkEnd(t.NodeId);
				break;
			case Protocol_1.Aki.Protocol.N2s.Proto_Destroy:
				this.DestroyNodeTrackMarkCreator(t.NodeId);
		}
	}
	OnBtApplyExpressionOccupation(e) {
		if (!e) for (var [, t] of this.JKt) t.OnExpressOccupied();
	}
	OnBtReleaseExpressionOccupation(e) {
		if (!e) for (var [, t] of this.JKt) t.OnExpressOccupationRelease();
	}
	OnSuspend(e) {
		1 === e && this.OnBtApplyExpressionOccupation(!1);
	}
	OnCancelSuspend() {
		this.Yre.IsOccupied || this.OnBtReleaseExpressionOccupation(!1);
	}
}
exports.TrackMarkExpressController = TrackMarkExpressController;
class NodeTrackMark {
	constructor(e, t, r, i) {
		(this.zKt = void 0),
			(this.TrackEffectOption = void 0),
			(this.ZKt = void 0),
			(this.MarkRange = 0),
			(this.RangeMarkShowDis = 0),
			(this.Gct = BigInt(0)),
			(this.B_t = 0),
			(this.b_t = 0),
			(this.eQt = void 0),
			(this.tQt = void 0),
			(this.iQt = void 0),
			(this.oQt = void 0),
			(this.rQt = !1),
			(this.nQt = !1),
			(this.sQt = (e, t) => {
				this.ZKt?.size &&
					(e = this.ZKt.get(e)) &&
					(EventSystem_1.EventSystem.Has(
						EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
						this.aQt,
					) ||
						EventSystem_1.EventSystem.Add(
							EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
							this.aQt,
						),
					this.eQt?.IsOccupied ||
						(this.eQt?.IsTracking &&
							((e.EntityId = t),
							(t = this.hQt(e.DungeonId, e, "CaptureVisions")),
							this.oQt.set(e.ConfigIndex, t),
							ModelManager_1.ModelManager.MapModel.SetTrackMark(
								this.MarkType,
								t,
								!0,
							))));
			}),
			(this.aQt = (e) => {
				var t;
				this.ZKt?.size &&
					(t = this.ZKt.get(e)) &&
					(this.ZKt.delete(e),
					this.ZKt.size ||
						(EventSystem_1.EventSystem.Has(
							EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
							this.aQt,
						) ||
							EventSystem_1.EventSystem.Remove(
								EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
								this.aQt,
							),
						EventSystem_1.EventSystem.Has(
							EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
							this.sQt,
						)) ||
						EventSystem_1.EventSystem.Remove(
							EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
							this.sQt,
						),
					(e = this.oQt.get(t.ConfigIndex)),
					this.iQt.set(t.ConfigIndex, !0),
					e) &&
					(this.lQt(e), this.oQt.delete(t.ConfigIndex));
			}),
			(this.Vdt = (e, t, r, i, a) => {
				t === this.Gct &&
					r === this.b_t &&
					(this.tQt.set(i, a),
					this.DefaultMapMarkId
						? (r = this.tQt.get(this.DefaultMapMarkId)) !==
								this.eQt.ContainTag(11) &&
							(r ? this.eQt.AddTag(11) : this.eQt.RemoveTag(11),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.RangeTrackStateChanged,
								t,
							))
						: this.eQt.RemoveTag(11));
			}),
			(this.Gct = t),
			(this.B_t = r),
			(this.b_t = i),
			(this.eQt = e),
			(this.oQt = new Map()),
			(this.tQt = new Map()),
			(this.iQt = new Map());
	}
	get TaskMarkTableId() {
		return this.eQt.TaskMarkTableId;
	}
	get MarkType() {
		return this.eQt.MarkType;
	}
	get TrackSource() {
		return this.eQt.TrackSource;
	}
	get DungeonId() {
		return this.eQt.DungeonId;
	}
	get DefaultMapMarkId() {
		return this.oQt.get(0);
	}
	Init(e) {
		switch (((this.zKt = []), (this.ZKt = new Map()), e.TrackType.Type)) {
			case "Locations":
				for (const t of e.TrackType.Locations)
					this.zKt.push(Vector_1.Vector.Create(t.X ?? 0, t.Y ?? 0, t.Z ?? 0));
				break;
			case "Entities":
				for (const t of e.TrackType.EntityIds) this.zKt.push(t);
				break;
			case "CaptureVisions":
				for (const r of e.TrackType.VisionDropEntities) {
					var t = new TrackVision();
					(t.VisionOwnerId = r), this.zKt.push(t);
				}
		}
		(this.TrackEffectOption = e.EffectOption),
			(this.MarkRange = e.Range ?? 0),
			(this.RangeMarkShowDis = e.ViewRange ?? 1.3 * e.Range),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TaskRangeTrackStateChange,
				this.Vdt,
			);
	}
	Destroy() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.TaskRangeTrackStateChange,
			this.Vdt,
		),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
				this.aQt,
			) ||
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
					this.aQt,
				),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
				this.sQt,
			) ||
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
					this.sQt,
				),
			this._Qt(),
			(this.oQt = void 0),
			this.ZKt?.clear(),
			(this.ZKt = void 0),
			this.zKt?.splice(0, this.zKt.length),
			(this.zKt = void 0);
	}
	OnNodeStart(e) {
		e ||
			((this.rQt = !0),
			this.eQt.MapMarkResident && this.CreateMapMarks(),
			this.eQt.IsTracking && this.EnableTrack(!0));
	}
	OnNodeEnd() {
		this._Qt(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TaskRangeTrackStateChange,
				this.Vdt,
			),
			(this.rQt = !1);
	}
	OnNodeProgressChanged(e) {
		if (this.zKt && e)
			for (let r = 0; r < this.zKt.length; r++) {
				const i = this.zKt[r];
				var t = e.findIndex((e) => e === i);
				let a = this.oQt.get(r);
				t < 0
					? (this.iQt.delete(r),
						this.nQt &&
							!a &&
							((a = this.uQt(r)), this.eQt.IsTracking) &&
							ModelManager_1.ModelManager.MapModel.SetTrackMark(
								this.MarkType,
								a,
								!0,
							))
					: (this.iQt.set(r, !0), a && (this.lQt(a), this.oQt.delete(r)));
			}
	}
	CreateMapMarks() {
		this.zKt.forEach((e, t) => {
			this.uQt(t);
		}),
			(this.nQt = !0);
	}
	uQt(e) {
		if (
			!this.iQt.get(e) &&
			this.zKt &&
			!(this.zKt.length <= e) &&
			(r = this.cQt(0, this.zKt[e]))
		) {
			var t = r[0],
				r = r[1],
				i = this.oQt.get(e);
			if (i) {
				var a = ModelManager_1.ModelManager.MapModel.GetMark(this.MarkType, i);
				if (this.mQt(a, t, r)) return i;
				this.lQt(a.MarkId), this.oQt.delete(e);
			}
			if (r instanceof Vector_1.Vector) {
				const i = this.hQt(t, r, "Locations");
				return this.oQt.set(e, i), i;
			}
			if (r instanceof TrackVision) {
				if (
					((i =
						ModelManager_1.ModelManager.VisionCaptureModel?.GetVisionCapture(
							r.VisionOwnerId,
						)),
					i)
				) {
					r.EntityId = i;
					const a = this.hQt(t, r, "CaptureVisions");
					return (
						this.oQt.set(e, a),
						this.ZKt?.set(r.VisionOwnerId, r),
						EventSystem_1.EventSystem.Has(
							EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
							this.aQt,
						) ||
							EventSystem_1.EventSystem.Add(
								EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
								this.aQt,
							),
						a
					);
				}
				(r.DungeonId = t),
					(r.ConfigIndex = e),
					this.ZKt?.set(r.VisionOwnerId, r),
					EventSystem_1.EventSystem.Has(
						EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
						this.sQt,
					) ||
						EventSystem_1.EventSystem.Add(
							EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
							this.sQt,
						);
			} else if (
				(a = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t))
			) {
				if (
					ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(
						r,
						a.MapConfigId,
					)
				) {
					const i = this.hQt(t, r, "Entities");
					return this.oQt.set(e, i), i;
				}
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"GeneralLogicTree",
						19,
						"追踪实体数据为空，请检查本地配置",
						["行为树Id", this.B_t],
						["节点Id", this.b_t],
						["实体Id", r],
						["副本Id", t],
					);
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"GeneralLogicTree",
						19,
						"GeneralLogicTree：找不到副本的配置",
						["行为树Id", this.B_t],
						["节点Id", this.b_t],
						["副本Id", t],
					);
		}
	}
	hQt(e, t, r) {
		return t
			? (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Quest",
						19,
						"行为树添加追踪标记",
						["行为树Id", this.B_t],
						["节点Id", this.b_t],
						["追踪目标副本Id", e],
						["追踪目标", t],
					),
				(e = new MapDefine_1.QuestMarkCreateInfo(
					e,
					this.Gct,
					this.b_t,
					this.dQt(t),
					this.TaskMarkTableId,
					this.MarkType,
					0,
					this.TrackSource,
				)),
				ModelManager_1.ModelManager.MapModel.CreateMapMark(e))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Quest",
						19,
						"添加追踪标记时，追踪坐标为空，请检查配置",
						["行为树Id", this.B_t],
						["节点Id", this.b_t],
					),
				0);
	}
	dQt(e) {
		return e instanceof TrackVision ? e.EntityId : e;
	}
	_Qt() {
		for (var [, e] of (this.CQt(!1), this.oQt))
			ModelManager_1.ModelManager.MapModel.RemoveMapMark(this.MarkType, e);
		this.oQt.clear(),
			(this.nQt = !1),
			this.tQt.clear(),
			this.eQt.RemoveTag(11),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RangeTrackStateChanged,
				this.Gct,
			);
	}
	lQt(e) {
		ModelManager_1.ModelManager.MapModel.RemoveMapMark(this.MarkType, e),
			TrackController_1.TrackController.EndTrack(this.TrackSource, e);
	}
	EnableTrack(e) {
		this.rQt &&
			(e
				? (this.CreateMapMarks(),
					this.CQt(!0),
					this.eQt?.IsOccupied && this.OnExpressOccupied())
				: this.eQt.MapMarkResident
					? this.CQt(!1)
					: this._Qt());
	}
	CQt(e) {
		for (var [t, r] of this.oQt) {
			var i = ModelManager_1.ModelManager.MapModel.GetMark(this.MarkType, r);
			if (i)
				if (e) {
					if (((t = this.zKt[t]), (t = this.cQt(1, t)))) {
						let e,
							n = !1;
						"Nearest" === this.eQt.TrackViewModel && (e = this.B_t);
						var a =
							((a = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
								this.B_t,
							)) && (n = a.AutoHideTrackMark),
							{
								TrackSource: this.TrackSource,
								Id: r,
								IconPath:
									ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkConfig(
										i.MarkConfigId,
									).MarkPic,
								TrackTarget: this.dQt(t[1]),
								ShowGroupId: e,
								AutoHideTrack: n,
								IsInTrackRange: this.eQt.ContainTag(11),
								IsSubTrack: this.eQt.IsNeedScaledTrackMark(this.b_t),
							});
						TrackController_1.TrackController.StartTrack(a);
					}
				} else TrackController_1.TrackController.EndTrack(this.TrackSource, r);
			else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"GeneralLogicTree",
						19,
						"BehaviorTree:创建追踪标记时找不到地图标记数据",
						["行为树Id", this.B_t],
						["节点Id", this.b_t],
						["markId", r],
					);
		}
	}
	cQt(e, t) {
		var r = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
			i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(r);
		if (i) {
			var a = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
				this.DungeonId,
			);
			if (a) {
				if (r === this.DungeonId)
					return this.eQt.BtType !==
						Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest ||
						13 === i.InstSubType ||
						0 !== e ||
						i.EntranceEntities?.length
						? [r, t]
						: void 0;
				var n = i.InstSubType,
					o = a.InstSubType;
				let c,
					h = 0;
				switch (n) {
					case 13:
						13 !== o &&
							(s = a.EntranceEntities)?.length &&
							((c = s[0].EntranceEntityId), (h = s[0].DungeonId));
						break;
					case 12:
						if (0 === e) {
							if (13 !== o) {
								var s = a.EntranceEntities;
								if (!s?.length) break;
								(c = s[0].EntranceEntityId), (h = s[0].DungeonId);
								break;
							}
							(c = t), (h = this.DungeonId);
						} else if (1 === e) {
							if (!i.ExitEntities?.length) break;
							(c = i.ExitEntities[0]), (h = r);
						}
						break;
					default:
						if (1 !== e)
							if (13 === o) (h = this.DungeonId), (c = t);
							else {
								if (((s = a.EntranceEntities), !s?.length)) break;
								(h = s[0].DungeonId), (c = s[0].EntranceEntityId);
							}
				}
				return c && h ? [h, c] : void 0;
			}
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"GeneralLogicTree",
					19,
					"GeneralLogicTree：找不到追踪目标副本的配置",
					["行为树Id", this.B_t],
					["副本Id", this.DungeonId],
				);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"GeneralLogicTree",
					19,
					"GeneralLogicTree：找不到当前副本的配置",
					["行为树Id", this.B_t],
					["副本Id", r],
				);
	}
	GetTrackPosition(e = !1) {
		let t;
		if (
			(t =
				(void 0 !== this.DefaultMapMarkId &&
					((i = ModelManager_1.ModelManager.TrackModel.GetTrackData(
						this.TrackSource,
						this.DefaultMapMarkId,
					)),
					(t = i?.TrackTarget))) ||
				this.gQt())
		) {
			if (t instanceof Vector_1.Vector) return t;
			let a;
			if (t instanceof TrackVision)
				a = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.EntityId);
			else if (
				!(a = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t))
			)
				return ModelManager_1.ModelManager.CreatureModel.CheckEntityVisible(
					t,
				) || e
					? GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetEntityConfigPosition(
							t,
						)
					: void 0;
			if (a) {
				var r,
					i = CharacterController_1.CharacterController.GetActorComponent(a);
				if (i && ObjectUtils_1.ObjectUtils.IsValid(i.Owner))
					return (
						(e = Vector_1.Vector.Create(i.ActorLocationProxy)),
						(r = a.Entity.GetComponent(0)) &&
							((r = r.GetPbModelConfig())?.TrackHeight
								? (e.Z += r.TrackHeight)
								: (0, RegisterComponent_1.isComponentInstance)(i, 3) &&
									(e.Z += i.ScaledHalfHeight)),
						e
					);
			}
		}
	}
	GetDefaultMark() {
		return this.DefaultMapMarkId;
	}
	gQt() {
		var e;
		if (this.zKt && this.zKt.length)
			return (
				(e = this.zKt.find((e, t) => !this.iQt.get(t))), this.cQt(1, e)?.[1]
			);
	}
	mQt(e, t, r) {
		return (
			e.MapId === t &&
			(e.TrackTarget instanceof Vector_1.Vector && r instanceof Vector_1.Vector
				? e.TrackTarget.Equality(r)
				: e.TrackTarget === r)
		);
	}
	OnExpressOccupied() {
		if (0 !== this.oQt.size)
			for (var [, e] of this.oQt)
				TrackController_1.TrackController.SetTrackMarkOccupied(
					this.TrackSource,
					e,
					!0,
				),
					MapController_1.MapController.ForceSetMarkVisible(
						this.MarkType,
						e,
						!1,
					);
	}
	OnExpressOccupationRelease() {
		if (this.rQt) {
			if (0 !== this.oQt.size)
				for (var [, e] of this.oQt)
					ModelManager_1.ModelManager.TrackModel.IsTracking(
						this.TrackSource,
						e,
					) &&
						TrackController_1.TrackController.SetTrackMarkOccupied(
							this.TrackSource,
							e,
							!1,
						),
						MapController_1.MapController.ForceSetMarkVisible(
							this.MarkType,
							e,
							!0,
						);
		} else this.OnNodeStart(!1);
	}
}
