"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, o) {
		var r,
			i = arguments.length,
			s =
				i < 3
					? t
					: null === o
						? (o = Object.getOwnPropertyDescriptor(t, n))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(e, t, n, o);
		else
			for (var a = e.length - 1; 0 <= a; a--)
				(r = e[a]) && (s = (i < 3 ? r(s) : 3 < i ? r(t, n, s) : r(t, n)) || s);
		return 3 < i && s && Object.defineProperty(t, n, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiModelRenderingMaterialComponent = void 0);
const UE = require("ue"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	EffectUtil_1 = require("../../../../Utils/EffectUtil"),
	UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
	UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelRenderingMaterialComponent = class extends UiModelComponentBase_1.UiModelComponentBase {
	constructor() {
		super(...arguments),
			(this.ActorComponent = void 0),
			(this.UiModelDataComponent = void 0),
			(this.TBr = new Map()),
			(this.LBr = 0),
			(this.DBr = new Set()),
			(this.OnModelLoadComplete = () => {
				this.m8();
			});
	}
	get rWt() {
		return this.LBr++;
	}
	OnInit() {
		(this.ActorComponent = this.Owner.CheckGetComponent(1)),
			(this.UiModelDataComponent = this.Owner.CheckGetComponent(0));
	}
	OnStart() {
		EventSystem_1.EventSystem.AddWithTarget(
			this.Owner,
			EventDefine_1.EEventName.OnUiModelLoadComplete,
			this.OnModelLoadComplete,
		);
	}
	OnEnd() {
		EventSystem_1.EventSystem.RemoveWithTarget(
			this.Owner,
			EventDefine_1.EEventName.OnUiModelLoadComplete,
			this.OnModelLoadComplete,
		);
		for (const t of this.TBr.values()) {
			var e = t.HandleId;
			e &&
				e !== ResourceSystem_1.ResourceSystem.InvalidId &&
				ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e);
		}
		this.TBr.clear(),
			this.ActorComponent.CharRenderingComponent?.ResetAllRenderingState();
	}
	SetRenderingMaterial(e) {
		var t = this.rWt;
		e = {
			EffectId: e,
			HandleId: ResourceSystem_1.ResourceSystem.InvalidId,
			RenderingId: ResourceSystem_1.ResourceSystem.InvalidId,
		};
		return this.TBr.set(t, e), this.DBr.add(t), this.m8(), t;
	}
	AddRenderingMaterialByData(e) {
		var t = this.rWt;
		e = {
			MaterialAssetData: e,
			HandleId: ResourceSystem_1.ResourceSystem.InvalidId,
			RenderingId: ResourceSystem_1.ResourceSystem.InvalidId,
		};
		return this.TBr.set(t, e), this.DBr.add(t), this.m8(), t;
	}
	m8() {
		if (2 === this.UiModelDataComponent?.GetModelLoadState()) {
			for (const e of this.DBr) this.RBr(e);
			this.DBr.clear();
		}
	}
	RBr(e) {
		const t = this.TBr.get(e);
		var n;
		e = (e) => {
			t.RenderingId =
				this.ActorComponent.CharRenderingComponent.AddMaterialControllerData(e);
		};
		t.EffectId
			? ((n = EffectUtil_1.EffectUtil.GetEffectPath(t.EffectId)),
				(t.HandleId = ResourceSystem_1.ResourceSystem.LoadAsync(
					n,
					UE.Object,
					e,
				)))
			: t.MaterialAssetData && e(t.MaterialAssetData);
	}
	RemoveRenderingMaterial(e) {
		var t,
			n = this.TBr.get(e);
		n &&
			((t = n.HandleId) &&
				t !== ResourceSystem_1.ResourceSystem.InvalidId &&
				ResourceSystem_1.ResourceSystem.CancelAsyncLoad(t),
			(t = n.RenderingId) &&
				t !== ResourceSystem_1.ResourceSystem.InvalidId &&
				this.ActorComponent.CharRenderingComponent.RemoveMaterialControllerData(
					t,
				),
			this.TBr.delete(e));
	}
	RemoveRenderingMaterialWithEnding(e) {
		var t,
			n = this.TBr.get(e);
		n &&
			((t = n.HandleId) &&
				t !== ResourceSystem_1.ResourceSystem.InvalidId &&
				ResourceSystem_1.ResourceSystem.CancelAsyncLoad(t),
			(t = n.RenderingId) &&
				t !== ResourceSystem_1.ResourceSystem.InvalidId &&
				this.ActorComponent.CharRenderingComponent.RemoveMaterialControllerDataWithEnding(
					t,
				),
			this.TBr.delete(e));
	}
};
(UiModelRenderingMaterialComponent = __decorate(
	[(0, UiModelComponentDefine_1.RegisterUiModelComponent)(5)],
	UiModelRenderingMaterialComponent,
)),
	(exports.UiModelRenderingMaterialComponent =
		UiModelRenderingMaterialComponent);
