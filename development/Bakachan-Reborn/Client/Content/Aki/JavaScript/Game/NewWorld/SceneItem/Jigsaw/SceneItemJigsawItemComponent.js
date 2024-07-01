"use strict";
var SceneItemJigsawItemComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, n, o) {
			var i,
				s = arguments.length,
				r =
					s < 3
						? t
						: null === o
							? (o = Object.getOwnPropertyDescriptor(t, n))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				r = Reflect.decorate(e, t, n, o);
			else
				for (var a = e.length - 1; 0 <= a; a--)
					(i = e[a]) &&
						(r = (s < 3 ? i(r) : 3 < s ? i(t, n, r) : i(t, n)) || r);
			return 3 < s && r && Object.defineProperty(t, n, r), r;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemJigsawItemComponent = void 0);
const UE = require("ue"),
	EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
	IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	SceneItemJigsawBaseComponent_1 = require("./SceneItemJigsawBaseComponent"),
	sinValue = [0, 1, 0, -1],
	cosValue = [1, 0, -1, 0];
let SceneItemJigsawItemComponent =
	(SceneItemJigsawItemComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.Config = void 0),
				(this.CreatureDataComp = void 0),
				(this.Hte = void 0),
				(this.Ncn = void 0),
				(this.Lie = void 0),
				(this.Direction = 0),
				(this.hmn = []),
				(this.lmn = void 0),
				(this._mn = void 0),
				(this.umn = void 0),
				(this.cmn = 0),
				(this.gIe = (e, t) => {
					var n = 793256493,
						o = 741712776,
						i = 1488947861,
						s = this.Lie.HasTag(o) || this.Lie.HasTag(i),
						r = this.Lie.HasTag(n),
						a = s ? 2142861976 : -628734864;
					for (const t of e)
						if (t === n)
							for (const e of this.hmn)
								this.Ncn.AddTagsByIndex(e, t), this.Ncn.AddTagsByIndex(e, a);
					for (const e of t) {
						if ((e === o || e === i) && r)
							for (const e of this.hmn)
								this.Ncn.RemoveTagsByIndex(e, 2142861976);
						if (e === n)
							for (const t of this.hmn)
								this.Ncn.RemoveTagsByIndex(t, e),
									this.Ncn.RemoveTagsByIndex(t, a);
					}
				});
		}
		set PutDownIndex(e) {
			this._mn = e;
		}
		get PutDownIndex() {
			return this._mn;
		}
		set PutDownBase(e) {
			this.umn = e;
		}
		get PutDownBase() {
			return this.umn;
		}
		get Rotation() {
			return this.cmn;
		}
		set Rotation(e) {
			this.cmn = e;
		}
		OnInitData(e) {
			e = e.GetParam(SceneItemJigsawItemComponent_1)[0];
			var t = ((this.Config = e), this.Config.FillCfg),
				n = this.Config.FillCfg;
			switch (this.Config.FillCfg.Type) {
				case IComponent_1.EFillType.Fixed:
					var o = n.Centre;
					this.lmn = new SceneItemJigsawBaseComponent_1.JigsawIndex(
						o.RowIndex,
						o.ColumnIndex,
					);
					for (const e of n.Config.Pieces)
						e.InitState === IAction_1.EJigsawPieceState.Correct &&
							this.hmn.push(
								new SceneItemJigsawBaseComponent_1.JigsawIndex(
									e.Index.RowIndex,
									e.Index.ColumnIndex,
								),
							);
					break;
				case IComponent_1.EFillType.Direction:
					t.W && (this.Direction |= 2),
						t.S && (this.Direction |= 4),
						t.A && (this.Direction |= 8),
						t.D && (this.Direction |= 16),
						(o = new SceneItemJigsawBaseComponent_1.JigsawIndex(0, 0)),
						this.hmn.push(o),
						(this.lmn = o);
			}
			return !0;
		}
		OnStart() {
			return (
				(this.Hte = this.Entity.GetComponent(182)),
				(this.CreatureDataComp = this.Entity.GetComponent(0)),
				(this.Ncn = this.Entity.GetComponent(143)),
				(this.Lie = this.Entity.GetComponent(177)),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnLevelTagChanged,
					this.gIe,
				),
				!0
			);
		}
		OnEnd() {
			return (
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnLevelTagChanged,
					this.gIe,
				),
				!0
			);
		}
		OnActivate() {
			this.emn();
		}
		emn() {
			var e = this.Config.FillCfg;
			if (e.Type === IComponent_1.EFillType.Fixed)
				if (void 0 !== e.ModelId) {
					var t = [];
					for (const e of this.hmn) t.push(e);
					this.Ncn.InitGenerateInfo(e.ModelId.toString(), t, (e) =>
						Vector_1.Vector.Create(this.GetBlockLocationByIndex(e)),
					);
				} else this.Ncn.SetIsFinish(!0);
		}
		GetCenterIndex() {
			return this.lmn;
		}
		GetActiveBlockOffset(e) {
			var t = [];
			for (const n of this.hmn)
				t.push(
					this.mmn(
						new SceneItemJigsawBaseComponent_1.JigsawIndex(
							n.Row - this.lmn.Row,
							n.Col - this.lmn.Col,
						),
						e,
					),
				);
			return t;
		}
		RotateSelf() {
			this.cmn += 90;
		}
		mmn(e, t) {
			t = ((t ?? this.cmn) / 90) % sinValue.length;
			var n = e.Row * cosValue[t] - e.Col * sinValue[t];
			e = e.Row * sinValue[t] + e.Col * cosValue[t];
			return new SceneItemJigsawBaseComponent_1.JigsawIndex(n, e);
		}
		GetBlockLocationByIndex(e) {
			var t,
				n,
				o = this.Config.FillCfg;
			return o.Type !== IComponent_1.EFillType.Fixed
				? this.Hte.ActorLocationProxy
				: e.Row >= o.Config.Row || e.Col >= o.Config.Column
					? void 0
					: ((n = (t = this.lmn).Row - e.Row),
						(t = t.Col - e.Col),
						(e = o.Config.Size),
						(o = Vector2D_1.Vector2D.Create(e, e).MultiplyEqual(
							Vector2D_1.Vector2D.Create(n, t),
						)),
						(e = new UE.Vector(o.X, -o.Y, 0)),
						(n = Vector_1.Vector.Create(0, 0, 0)).FromUeVector(
							this.Hte.ActorTransform.TransformPosition(e),
						),
						n);
		}
		OnPutDownToBase(e) {
			this.umn = e;
			for (const n of this.hmn) {
				var t = this.mmn(
					new SceneItemJigsawBaseComponent_1.JigsawIndex(
						n.Row - this.lmn.Row,
						n.Col - this.lmn.Col,
					),
				);
				switch (
					((t.Row += this.PutDownIndex.Row),
					(t.Col += this.PutDownIndex.Col),
					e.GetBlockStateByIndex(t))
				) {
					case 1:
						this.Ncn.AddTagsByIndex(n, -1682391476);
						break;
					case 2:
						this.Ncn.AddTagsByIndex(n, -1936327549);
				}
			}
		}
		OnPickUpFormBase(e) {
			this.umn = void 0;
			for (const n of this.hmn) {
				var t = this.mmn(
					new SceneItemJigsawBaseComponent_1.JigsawIndex(
						n.Row - this.lmn.Row,
						n.Col - this.lmn.Col,
					),
				);
				switch (
					((t.Row += this.PutDownIndex.Row),
					(t.Col += this.PutDownIndex.Col),
					e.GetBlockStateByIndex(t))
				) {
					case 1:
						this.Ncn.RemoveTagsByIndex(n, -1682391476);
						break;
					case 2:
						this.Ncn.RemoveTagsByIndex(n, -1936327549);
				}
			}
		}
		OnFinish() {
			for (const e of this.hmn) this.Ncn.AddTagsByIndex(e, 754952868);
		}
		GetNextMoveTargetOnHit(e) {
			if (this.PutDownBase?.Valid)
				return [
					(e = this.PutDownBase.GetNextPosByDirection(
						this.PutDownIndex,
						e,
						this.Entity,
					)).GetKey() !== this.PutDownIndex.GetKey(),
					this.PutDownBase.GetBlockLocationByIndex(e),
					e,
				];
		}
		OnMove(e) {
			this.PutDownBase.OnItemMove(this, e);
		}
		RemoveMagnetTipsTag() {
			this.PutDownBase.RemoveMagnetTipsTag(this.PutDownIndex);
		}
		GetAllActivatedBlockPos() {
			var e = [];
			for (const n of this.hmn) {
				var t = this.GetBlockLocationByIndex(n);
				t && e.push(Vector_1.Vector.Create(t));
			}
			return e;
		}
	});
(SceneItemJigsawItemComponent = SceneItemJigsawItemComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(122)],
		SceneItemJigsawItemComponent,
	)),
	(exports.SceneItemJigsawItemComponent = SceneItemJigsawItemComponent);
