"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldMapMoveComponent = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	MarkItem_1 = require("../../Map/Marks/MarkItem/MarkItem"),
	WorldMapComponentBase_1 = require("./WorldMapComponentBase");
class WorldMapMoveComponent extends WorldMapComponentBase_1.WorldMapComponentBase {
	constructor(e, t) {
		super(e),
			(this.G2o = void 0),
			(this.K2o = !1),
			(this.Q2o = void 0),
			(this.X2o = void 0),
			(this.$2o = void 0),
			(this.Y2o = new Vector2D_1.Vector2D()),
			(this.J2o = new Vector2D_1.Vector2D()),
			(this.z2o = void 0),
			(this.Z2o = (e) => {
				(e = Vector2D_1.Vector2D.Create(e)), this.SetMapPosition(e, !1, 2);
			}),
			(this.eFo = (e) => {
				var t = Vector2D_1.Vector2D.Create();
				e.Multiply(this.G2o.TweenTime, t),
					(e = Vector2D_1.Vector2D.Create(
						this.Map.GetRootItem().GetAnchorOffset(),
					).AdditionEqual(t));
				this.SetMapPosition(
					e,
					!0,
					1,
					2,
					CommonParamById_1.configCommonParamById.GetFloatConfig(
						"MapDragInertiaTime",
					),
				);
			}),
			(this.FCo = () => {
				this.Q2o?.Kill(!0);
			}),
			(this.tFo = () => {
				this.Q2o?.Kill(!0);
			}),
			(this.aWe = (e) => {
				this.iFo(e);
			}),
			(this.oFo = !1),
			(this.rFo = !1),
			(this.nFo = (e) => {
				(this.Y2o.Y = e), (this.oFo = !0);
			}),
			(this.sFo = (e) => {
				(this.J2o.X = e), (this.rFo = !0);
			}),
			(this.$2o = { MinX: 0, MaxX: 0, MinY: 0, MaxY: 0 }),
			(this.z2o = { MinX: 0, MaxX: 0, MinY: 0, MaxY: 0 }),
			(this.G2o = t),
			(this.X2o = (0, puerts_1.toManualReleaseDelegate)(this.Z2o));
	}
	get SafeAreaSize() {
		var e = this.$2o;
		return (
			(e.MinX =
				-(
					(this.MapSize.X + this.Map.MapOffset.Y) * this.MapScale -
					this.ViewportSize.X
				) / 2),
			(e.MaxX =
				((this.MapSize.X - this.Map.MapOffset.X) * this.MapScale -
					this.ViewportSize.X) /
				2),
			(e.MinY =
				-(
					(this.MapSize.Y - this.Map.MapOffset.Z) * this.MapScale -
					this.ViewportSize.Y
				) / 2),
			(e.MaxY =
				((this.MapSize.Y - this.Map.MapOffset.W) * this.MapScale -
					this.ViewportSize.Y) /
				2),
			e
		);
	}
	get DangerousAreaSize() {
		var e = this.z2o;
		return (
			(e.MinX =
				-(
					(this.MapSize.X + this.Map.MapOffset.Y + this.Map.FakeOffset) *
						this.MapScale -
					this.ViewportSize.X
				) / 2),
			(e.MaxX =
				((this.MapSize.X - this.Map.MapOffset.X + this.Map.FakeOffset) *
					this.MapScale -
					this.ViewportSize.X) /
				2),
			(e.MinY =
				-(
					(this.MapSize.Y - this.Map.MapOffset.Z + this.Map.FakeOffset) *
						this.MapScale -
					this.ViewportSize.Y
				) / 2),
			(e.MaxY =
				((this.MapSize.Y - this.Map.MapOffset.W + this.Map.FakeOffset) *
					this.MapScale -
					this.ViewportSize.Y) /
				2),
			e
		);
	}
	get IsTweeningMove() {
		return this.K2o;
	}
	KillTweening() {
		this.K2o && this.aFo(), (this.K2o = !1);
	}
	get MapScale() {
		return ModelManager_1.ModelManager.WorldMapModel.MapScale;
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.WorldMapDragInertia,
			this.eFo,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldMapPointerDrag,
				this.aWe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldMapPointerDown,
				this.FCo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldMapWheelAxisInput,
				this.tFo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldMapJoystickMoveForward,
				this.nFo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldMapJoystickMoveRight,
				this.sFo,
			);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.WorldMapDragInertia,
			this.eFo,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldMapPointerDrag,
				this.aWe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldMapPointerDown,
				this.FCo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldMapWheelAxisInput,
				this.tFo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldMapJoystickMoveForward,
				this.nFo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldMapJoystickMoveRight,
				this.sFo,
			);
	}
	OnDestroy() {
		this.aFo(),
			(0, puerts_1.releaseManualReleaseDelegate)(this.Z2o),
			(this.X2o = void 0),
			(this.$2o = void 0),
			(this.z2o = void 0),
			(this.G2o = void 0);
	}
	PushMap(e, t = !0, o = 2) {
		var i, a, s, r, n;
		this.G2o
			? ((i = e.UiPosition.X),
				(e = e.UiPosition.Y),
				(a = this.Map.GetRootItem().GetAnchorOffset()),
				(n = i * this.MapScale + a.X),
				(a = e * this.MapScale + a.Y),
				(s = this.G2o.FocusMark_AnchoredPosition.X),
				(r = this.G2o.FocusMark_AnchoredPosition.Y),
				n === s && a === r
					? EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.WorldMapPositionChanged,
						)
					: ((n = Vector2D_1.Vector2D.Create(
							-i * this.MapScale + s,
							-e * this.MapScale + r,
						)),
						this.SetMapPosition(
							n,
							t,
							o,
							this.G2o.TweenTypeEase,
							this.G2o.TweenTime,
						)))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Map", 19, "请于根节点挂KuroWorldMapUIParams组件");
	}
	SetMapPosition(e, t, o = 0, i, a, s = !0) {
		if (e)
			if (this.G2o) {
				let r = Vector2D_1.Vector2D.Create();
				e instanceof Vector2D_1.Vector2D
					? r.DeepCopy(e)
					: e instanceof MarkItem_1.MarkItem &&
						((r.X = e.UiPosition.X),
						(r.Y = e.UiPosition.Y),
						r.MultiplyEqual(this.MapScale).UnaryNegation(r)),
					(e = Vector2D_1.Vector2D.Create(r.X, r.Y)),
					(r = this.hFo(e, o)),
					t
						? ((this.K2o = !0),
							this.aFo(),
							(this.Q2o = UE.LTweenBPLibrary.Vector2To(
								GlobalData_1.GlobalData.World,
								this.X2o,
								this.Map.GetRootItem().GetAnchorOffset(),
								r.ToUeVector2D(!0),
								a,
								0,
								i,
							)),
							this.Q2o.OnCompleteCallBack.Bind(() => {
								this.K2o = !1;
							}))
						: (this.Map.GetRootItem().SetAnchorOffset(r.ToUeVector2D(!0)),
							s &&
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.WorldMapPositionChanged,
								));
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 19, "请于根节点挂KuroWorldMapUIParams组件");
	}
	FocusPlayer(e, t = !1, o = 0) {
		var i = Vector2D_1.Vector2D.Create();
		e.Multiply(this.MapScale, i).UnaryNegation(i),
			this.SetMapPosition(i, t, o, this.G2o.TweenTypeEase, this.G2o.TweenTime);
	}
	hFo(e, t, o = !1) {
		let i = e.X,
			a = e.Y;
		switch (t) {
			case 0:
				break;
			case 1:
				(i = MathCommon_1.MathCommon.Clamp(
					e.X,
					this.SafeAreaSize.MinX,
					this.SafeAreaSize.MaxX,
				)),
					(a = MathCommon_1.MathCommon.Clamp(
						e.Y,
						this.$2o.MinY,
						this.$2o.MaxY,
					));
				break;
			case 2:
				(i = MathCommon_1.MathCommon.Clamp(
					e.X,
					this.DangerousAreaSize.MinX,
					this.DangerousAreaSize.MaxX,
				)),
					(a = MathCommon_1.MathCommon.Clamp(
						e.Y,
						this.DangerousAreaSize.MinY,
						this.DangerousAreaSize.MaxY,
					));
		}
		let s = e;
		return (
			o || 0 === t
				? ((s.X = i), (s.Y = a))
				: (s = Vector2D_1.Vector2D.Create(i, a)),
			s
		);
	}
	aFo() {
		this.Q2o && (this.Q2o.Kill(), (this.Q2o = void 0));
	}
	iFo(e) {
		var t = Vector2D_1.Vector2D.Create(
			this.Map.GetRootItem().GetAnchorOffset(),
		);
		this.SetMapPosition(t.AdditionEqual(e), !1, 2);
	}
	TickMoveDirty() {
		var e;
		(this.oFo || this.rFo) &&
			((e = Vector2D_1.Vector2D.Create(
				this.Map.GetRootItem().GetAnchorOffset(),
			)),
			this.oFo && (e.AdditionEqual(this.Y2o), (this.oFo = !1)),
			this.rFo && (e.AdditionEqual(this.J2o), (this.rFo = !1)),
			this.SetMapPosition(e, !1, 2));
	}
}
exports.WorldMapMoveComponent = WorldMapMoveComponent;
