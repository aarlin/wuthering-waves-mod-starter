"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MarkAssistant = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../Core/Net/Net"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
	WorldMapController_1 = require("../../WorldMap/WorldMapController"),
	MapDefine_1 = require("../MapDefine"),
	MapUtil_1 = require("../MapUtil"),
	MarkItemDataUtil_1 = require("../Marks/MarkItemDataUtil");
class MarkAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
	constructor() {
		super(...arguments),
			(this.FTi = 0),
			(this.Jpe = (e, o, r) => {
				var t = o.Entity.GetComponent(0),
					a = t.GetPbEntityInitData();
				t.GetEntityConfigType() ===
					Protocol_1.Aki.Protocol.USs.Proto_Character ||
					MapUtil_1.MapUtil.IsTemporaryTeleportEntity(a) ||
					((a = t.GetBaseInfo())?.MapIcon &&
						ModelManager_1.ModelManager.MapModel.AddEntityIdToPendingList(
							o.Id,
							a.MapIcon,
						));
			}),
			(this.zpe = (e, o) => {
				ModelManager_1.ModelManager.MapModel.RemoveEntityIdToPendingList(o.Id);
			}),
			(this.VTi = (e) => {
				ModelManager_1.ModelManager.MapModel.SetTrackMark(0, e.G6n, !0);
			}),
			(this.HTi = (e) => {
				ModelManager_1.ModelManager.MapModel.SetTrackMark(0, e.G6n, !1);
			}),
			(this.jTi = (e) => {
				ModelManager_1.ModelManager.MapModel.ResetDynamicMarkData();
				for (const r of e.kAs) {
					var o =
						0 === r.O6n
							? Vector2D_1.Vector2D.Create(r.N6n, r.k6n)
							: Vector_1.Vector.Create(r.N6n, r.k6n, r.O6n);
					o = new MapDefine_1.DynamicMarkCreateInfo(
						o,
						r.R5n,
						MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(
							r.F6n,
						),
						r.G6n,
						void 0,
						!1,
						void 0,
						r.jkn,
					);
					ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(o),
						0 === this.FTi &&
							r.F6n === Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_SoundBox &&
							(this.FTi = o.MarkId ?? 0);
				}
				for (const o of e.NAs)
					ModelManager_1.ModelManager.MapModel.SetMarkExtraShowState(
						o.G6n,
						o.zkn,
						!1,
						o.VAs,
					);
				for (const o of e.jAs)
					ModelManager_1.ModelManager.MapModel.SetMarkServerOpenState(o, !0);
			}),
			(this.WTi = (e) => {
				if (
					!ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() ||
					ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam() ||
					(e.a5n.F6n !==
						Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_TreasureBoxPoint &&
						e.a5n.F6n !== Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_SoundBox &&
						e.a5n.F6n !==
							Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_CalmingWindBell)
				) {
					var o = e.a5n,
						r = this.KTi(o);
					if (
						(ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(r),
						e.a5n.F6n ===
							Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_TreasureBoxPoint && e.WAs)
					)
						for (const o of e.WAs.OAs) {
							var t = this.KTi(o);
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Map",
									50,
									"添加物资箱标记",
									["pointInfo.Proto_MarkId", o.G6n],
									["pointInfo.Proto_ConfigId", o.R5n],
								),
								ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(t);
						}
					switch (
						MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(
							e.a5n.F6n,
						)
					) {
						case 15:
							break;
						case 17:
							this.QTi(
								17,
								o.G6n,
								(o) => {
									o &&
										0 === e.WAs.OAs.length &&
										ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
											"ExploreBoxUnfindable",
										);
								},
								!1,
								MapDefine_1.WORLD_MAP_MAX_SCALE,
							);
							break;
						case 16:
						case 21:
							this.QTi(16, o.G6n, void 0, !1, MapDefine_1.WORLD_MAP_MAX_SCALE),
								(this.FTi = o.G6n);
					}
				}
			}),
			(this.XTi = (e) => {
				ModelManager_1.ModelManager.MapModel?.SetMarkServerOpenState(e.G6n, !0);
			}),
			(this.$Ti = (e) => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Map", 50, "移除标记", ["notify.Proto_MarkId", e.G6n]),
					ModelManager_1.ModelManager.MapModel?.RemoveDynamicMapMark(
						MathUtils_1.MathUtils.LongToNumber(e.G6n),
					),
					e.G6n === this.FTi && (this.FTi = 0);
			}),
			(this.YTi = (e) => {
				ModelManager_1.ModelManager.MapModel.SetMarkExtraShowState(
					e.G6n,
					e.zkn,
					e.$As,
					e.VAs,
				);
			}),
			(this.JTi = (e) => {
				for (const r of e.Nxs)
					if (0 === r.G6n) {
						if (
							ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() &&
							!ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()
						)
							return;
						this.RequestCreateTemporaryTeleport(
							Vector_1.Vector.Create(r.M3n),
							MathUtils_1.MathUtils.LongToNumber(r.V6n),
						);
					} else {
						var o = new MapDefine_1.DynamicMarkCreateInfo(
							Vector_1.Vector.Create(r.M3n),
							ConfigManager_1.ConfigManager.MapConfig.GetDefaultDetectorMarkConfigId(),
							15,
							r.G6n ?? void 0,
							void 0,
							!1,
							MathUtils_1.MathUtils.LongToNumber(r.V6n),
						);
						ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(o);
					}
			}),
			(this.zTi = (e) => {
				var o = ModelManager_1.ModelManager.MapModel.GetDynamicMark(e.Fxs.G6n);
				void 0 !== o &&
					((e = MathUtils_1.MathUtils.LongToNumber(e.Fxs.V6n)),
					(o.TeleportId = e));
			}),
			(this.ZTi = (e) => {
				(ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() &&
					!ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) ||
					this.RequestCreateTemporaryTeleport(
						Vector_1.Vector.Create(e.Fxs.M3n),
						MathUtils_1.MathUtils.LongToNumber(e.Fxs.V6n),
					);
			}),
			(this.eLi = (e) => {}),
			(this.tLi = (e) => {
				for (const o of e.Ffs)
					ModelManager_1.ModelManager.MapModel.AddOccupationInfo(o);
			}),
			(this.iLi = (e) => {
				for (const o of e.Ffs)
					ModelManager_1.ModelManager.MapModel.AddOccupationInfo(o),
						ModelManager_1.ModelManager.GeneralLogicTreeModel.AddOccupationInfo(
							o,
						);
			}),
			(this.oLi = (e) => {
				for (const o of e.dvs)
					ModelManager_1.ModelManager.MapModel.RemoveOccupationInfo(o),
						ModelManager_1.ModelManager.GeneralLogicTreeModel.RemoveOccupationInfo(
							o,
						);
			}),
			(this.rLi = (e, o) => {
				(void 0 === o || void 0 === o.pLs) && 0 < this.FTi
					? this.QTi(16, this.FTi, void 0, !1)
					: this.UseExploreToolCall(
							Vector_1.Vector.Create(e.Pos),
							Rotator_1.Rotator.Create(e.Rot),
							e.PhantomSkillId,
							o,
						);
			});
	}
	nLi(e, o, r) {
		var t = Protocol_1.Aki.Protocol.H6n.create();
		return (
			(t.N6n = e.X),
			(t.k6n = e.Y),
			(t.O6n = e.Z),
			(t.R5n = r),
			(t.F6n = o),
			(t.j6n = !1),
			(t.K6n = 0),
			t
		);
	}
	sLi(e, o, r) {
		var t = Protocol_1.Aki.Protocol.Qis.create();
		e = this.nLi(e, o, r);
		return (t.H6n = e), t;
	}
	KTi(e) {
		let o;
		return (
			(o =
				0 === e.O6n
					? Vector2D_1.Vector2D.Create(e.N6n, e.k6n)
					: Vector_1.Vector.Create(e.N6n, e.k6n, e.O6n)),
			new MapDefine_1.DynamicMarkCreateInfo(
				o,
				e.R5n,
				MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(e.F6n),
				e.G6n ?? void 0,
				void 0,
				!1,
				void 0,
				e.jkn,
			)
		);
	}
	OnDestroy() {}
	OnRegisterNetEvent() {
		Net_1.Net.Register(17530, this.VTi),
			Net_1.Net.Register(2894, this.HTi),
			Net_1.Net.Register(10990, this.jTi),
			Net_1.Net.Register(8504, this.WTi),
			Net_1.Net.Register(20058, this.XTi),
			Net_1.Net.Register(11420, this.$Ti),
			Net_1.Net.Register(10760, this.JTi),
			Net_1.Net.Register(4742, this.ZTi),
			Net_1.Net.Register(25737, this.zTi),
			Net_1.Net.Register(28437, this.eLi),
			Net_1.Net.Register(7458, this.YTi),
			Net_1.Net.Register(8549, this.tLi),
			Net_1.Net.Register(11795, this.iLi),
			Net_1.Net.Register(27382, this.oLi);
	}
	OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(17530),
			Net_1.Net.UnRegister(2894),
			Net_1.Net.UnRegister(10990),
			Net_1.Net.UnRegister(8504),
			Net_1.Net.UnRegister(11420),
			Net_1.Net.UnRegister(20058),
			Net_1.Net.UnRegister(10760),
			Net_1.Net.UnRegister(4742),
			Net_1.Net.UnRegister(25737),
			Net_1.Net.UnRegister(28437),
			Net_1.Net.UnRegister(7458),
			Net_1.Net.UnRegister(8549);
	}
	OnAddEvents() {
		EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.Jpe),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnUseMapExploreToolSuccess,
				this.rLi,
			);
	}
	OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.AddEntity,
			this.Jpe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnUseMapExploreToolSuccess,
				this.rLi,
			);
	}
	UseExploreToolCall(e, o, r, t) {
		switch (r) {
			case 1011:
				0 !== t.pLs.length &&
					this.aLi(Vector_1.Vector.Create(t.pLs[0].M3n), t.pLs[0].R5n);
				break;
			case 1012:
				this.hLi(e, t.Q6n, t.pLs);
		}
	}
	async RequestUseDetectionSkill(e, o, r) {
		var t = Protocol_1.Aki.Protocol.SJn.create();
		if (
			(e =
				((t.$6n = !0),
				(t.M3n = e),
				(t.S3n = o),
				(t.vkn = r),
				await Net_1.Net.CallAsync(22248, t)))
		) {
			if (e.Kms === Protocol_1.Aki.Protocol.lkn.Sys) return e;
			ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
				e.Kms,
				4212,
			);
		}
	}
	hLi(e, o, r) {
		var t = this.sLi(
			e,
			Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_TreasureBoxPoint,
			ConfigManager_1.ConfigManager.MapConfig.GetDefaultDetectorMarkConfigId(),
		);
		(t.X6n = Protocol_1.Aki.Protocol.X6n.create()),
			(t.X6n.Q6n = o),
			(t.X6n.Y6n = []);
		for (const e of r) {
			var a = this.nLi(
				Vector_1.Vector.Create(e.M3n),
				Protocol_1.Aki.Protocol.qNs.ENUMS.Y6n,
				ConfigManager_1.ConfigManager.MapConfig.GetDefaultDetectorMarkConfigId(),
			);
			(a.jkn = e.R5n), t.X6n.Y6n.push(a);
		}
		Net_1.Net.Call(17129, t, (e) => {
			e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
				ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.lkn,
					3209,
				);
		});
	}
	aLi(e, o) {
		var r = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(o);
		let t = Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_SoundBox,
			a =
				ConfigManager_1.ConfigManager.MapConfig.GetDefaultDetectorMarkConfigId();
		r &&
			(r = r.ComponentsData) &&
			16 ===
				(0, IComponent_1.getComponent)(r, "BaseInfoComponent")?.Category
					.ExploratoryDegree &&
			((t = Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_CalmingWindBell),
			(a = MapDefine_1.CALMING_WIND_BELL_MARKID)),
			((r = this.sLi(e, t, a)).H6n.jkn = o),
			Net_1.Net.Call(17129, r, (e) => {
				e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						3209,
					);
			});
	}
	QTi(e, o, r, t = !0, a = 1) {
		(ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() &&
			!ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) ||
			((o = {
				MarkId: o,
				MarkType: e,
				OpenAreaId: 0,
				IsNotFocusTween: !t,
				StartScale: a,
			}),
			WorldMapController_1.WorldMapController.OpenView(2, !1, o, r));
	}
	async RequestTrackInfo() {
		var e = Protocol_1.Aki.Protocol.Zis.create();
		if ((e = await Net_1.Net.CallAsync(28003, e)))
			if (e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
				ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.lkn,
					22827,
				);
			else
				for (const t of e.HAs) {
					var o =
							ConfigManager_1.ConfigManager.MapConfig.SearchGetMarkConfig(t),
						r = this.lLi(t);
					o = {
						TrackSource: 1,
						MarkType: o?.ObjectType,
						Id: t,
						IconPath: r.Icon,
						TrackTarget: r.TrackTarget,
					};
					ModelManager_1.ModelManager.TrackModel.AddTrackData(o),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.TrackMark,
							o,
						);
				}
	}
	lLi(e) {
		var o = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
		if (o)
			return {
				Icon: MarkItemDataUtil_1.MarkItemDataUtil.GetMarkIcon(e) ?? "",
				TrackTarget: o.EntityConfigId ?? Vector_1.Vector.Create(o.MarkVector),
			};
		if ((o = ModelManager_1.ModelManager.MapModel.GetDynamicMarkInfoById(e))) {
			let r;
			return (
				(e = ConfigManager_1.ConfigManager.MapConfig.GetCustomMarkConfig(
					o.MarkConfigId,
				)),
				(o = o.TrackTarget) instanceof Vector_1.Vector
					? (r = MapUtil_1.MapUtil.UiPosition2WorldPosition(o))
					: o instanceof Vector2D_1.Vector2D &&
						((o = Vector_1.Vector.Create(o.X, -o.Y, 0)),
						(r = MapUtil_1.MapUtil.UiPosition2WorldPosition(o))),
				{ Icon: e.MarkPic, TrackTarget: r }
			);
		}
		return { Icon: "", TrackTarget: Vector_1.Vector.Create(0, 0, 0) };
	}
	RequestMapMarkReplace(e, o) {
		(e = Protocol_1.Aki.Protocol.nrs.create({ G6n: e, R5n: o })),
			Net_1.Net.Call(14261, e, (e) => {
				ModelManager_1.ModelManager.MapModel.ReplaceCustomMarkIcon(
					e.G6n,
					e.R5n,
				);
			});
	}
	RequestCreateCustomMark(e, o) {
		var r;
		e
			? ModelManager_1.ModelManager.MapModel.GetMarkCountByType(9) >=
					ModelManager_1.ModelManager.WorldMapModel.CustomMarkSize ||
				((r = e instanceof Vector_1.Vector ? e.Z : 0),
				(r = this.sLi(
					Vector_1.Vector.Create(e.X, e.Y, r),
					Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_Custom,
					o,
				)),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Map",
						64,
						"[CustomMarkItem Debug]MarkAssistant.RequestCreateCustomMark->",
						["trackPosition", e],
						["configId", o],
						["request", r],
					),
				Net_1.Net.Call(17129, r, (e) => {
					e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
						ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							3209,
						),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Map",
								64,
								"[CustomMarkItem Debug]MarkAssistant.response->",
								["response.Info", e?.a5n],
							);
				}))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Map", 19, "向服务器请求创建标记时，坐标不存在");
	}
	RequestCreateTemporaryTeleport(e, o = void 0) {
		(e = this.sLi(
			e,
			Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_TemporaryTeleport,
			ConfigManager_1.ConfigManager.MapConfig.GetDefaultTemporaryTeleportMarkConfigId(),
		)),
			void 0 !== o && (e.J6n = { V6n: o }),
			Net_1.Net.Call(17129, e, (e) => {
				e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						3209,
					);
			});
	}
	RequestRemoveMapMark(e, o) {
		(o = Protocol_1.Aki.Protocol.Yis.create({ G6n: o })),
			Net_1.Net.Call(4673, o, (o) => {
				o.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							o.lkn,
							21719,
						)
					: ModelManager_1.ModelManager.MapModel.RemoveMapMark(e, o.G6n);
			});
	}
	RequestRemoveDynamicMapMark(e) {
		var o = ModelManager_1.ModelManager.MapModel.GetDynamicMark(e);
		void 0 === o
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("Map", 50, "找不到对应mark id:", ["markId", e])
			: this.RequestRemoveMapMark(o.MarkType, o.MarkId);
	}
	RequestTrackMapMark(e, o) {
		var r;
		o < 0
			? (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Map", 50, "markId小于0, 请求追踪信息未发给后端"),
				ModelManager_1.ModelManager.MapModel.SetTrackMark(e, o, !0))
			: ((r = Protocol_1.Aki.Protocol.trs.create({ G6n: o })),
				Net_1.Net.Call(23109, r, (r) => {
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Map", 50, "向服务端请求追踪标记: 标记id:", [
							"markId",
							o,
						]),
						r.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
							? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
									r.lkn,
									26248,
								)
							: ModelManager_1.ModelManager.MapModel.SetTrackMark(e, r.G6n, !0);
				}));
	}
	RequestCancelTrackMapMark(e, o) {
		var r;
		o < 0
			? (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Map", 50, "markId小于0, 请求取消追踪信息未发给后端"),
				ModelManager_1.ModelManager.MapModel.SetTrackMark(e, o, !1))
			: ((r = Protocol_1.Aki.Protocol.rrs.create({ G6n: o })),
				Net_1.Net.Call(3033, r, (r) => {
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Map", 50, "向服务端请求取消追踪标记: 标记id:", [
							"markId",
							o,
						]),
						r.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
							? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
									r.lkn,
									9003,
								)
							: ModelManager_1.ModelManager.MapModel.SetTrackMark(e, r.G6n, !1);
				}));
	}
	RequestTeleportToTargetByTemporaryTeleport(e, o) {
		var r = Protocol_1.Aki.Protocol.Pus.create(),
			t = Protocol_1.Aki.Protocol.iws.create();
		(t.Pitch = o.Pitch),
			(t.Roll = o.Roll),
			(t.Yaw = o.Yaw),
			(r.V6n = e),
			(r.S3n = t),
			Net_1.Net.Call(12834, r, (e) => {
				e.X5n !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.X5n,
						9003,
					);
			});
	}
	UpdateCustomMapMarkPosition(e, o) {
		(e = Protocol_1.Aki.Protocol.mrs.create({ G6n: e, M3n: o })),
			Net_1.Net.Call(2187, e, (e) => {
				e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						10484,
					);
			});
	}
}
exports.MarkAssistant = MarkAssistant;
