"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, o, t, i) {
		var a,
			n = arguments.length,
			s =
				n < 3
					? o
					: null === i
						? (i = Object.getOwnPropertyDescriptor(o, t))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(e, o, t, i);
		else
			for (var d = e.length - 1; 0 <= d; d--)
				(a = e[d]) && (s = (n < 3 ? a(s) : 3 < n ? a(o, t, s) : a(o, t)) || s);
		return 3 < n && s && Object.defineProperty(o, t, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiModelLoadComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	ModelUtil_1 = require("../../../../../Core/Utils/ModelUtil"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	UiModelResourcesManager_1 = require("../../../UiComponent/UiModelResourcesManager"),
	UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
	UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelLoadComponent = class extends UiModelComponentBase_1.UiModelComponentBase {
	constructor() {
		super(...arguments),
			(this.UiModelActorComponent = void 0),
			(this.UiModelDataComponent = void 0),
			(this.LoadHandleId =
				UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue),
			(this.ResourceLoadCache = void 0),
			(this._Gn = UE.NewArray(UE.SkeletalMesh)),
			(this.aGn =
				UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue),
			(this.LoadFinishCallBack = void 0);
	}
	OnInit() {
		(this.UiModelActorComponent = this.Owner.CheckGetComponent(1)),
			(this.UiModelDataComponent = this.Owner.CheckGetComponent(0));
	}
	OnEnd() {
		this.CancelLoad(), this.uGn();
	}
	GetMainMeshPath() {
		return ModelUtil_1.ModelUtil.GetModelConfig(
			this.UiModelDataComponent.ModelConfigId,
		).网格体.ToAssetPathName();
	}
	GetAnimClassPath() {
		return ModelUtil_1.ModelUtil.GetModelConfig(
			this.UiModelDataComponent.ModelConfigId,
		).动画蓝图.ToAssetPathName();
	}
	GetChildMeshPathList() {
		var e = ModelUtil_1.ModelUtil.GetModelConfig(
			this.UiModelDataComponent.ModelConfigId,
		).子网格体;
		if (e) {
			var o = e.Num();
			if (0 < o) {
				var t = new Array(o);
				for (let i = 0; i < o; i++) t[i] = e.Get(i).ToAssetPathName();
				return t;
			}
		}
	}
	LoadModelByModelId(e, o = !1, t) {
		(this.UiModelDataComponent.ModelConfigId = e),
			(this.LoadFinishCallBack = t),
			this.LoadModel(o);
	}
	LoadModel(e) {
		1 === this.UiModelDataComponent?.GetModelLoadState() &&
			(this.CancelLoad(), Log_1.Log.CheckWarn()) &&
			Log_1.Log.Warn("Character", 44, "取消上一个模型加载"),
			e && this.UiModelDataComponent?.SetVisible(!1),
			this.UiModelDataComponent?.SetModelLoadState(1);
		const o = this.GetMainMeshPath(),
			t = this.GetAnimClassPath(),
			i = this.GetChildMeshPathList();
		var a = [];
		if (
			(o && !StringUtils_1.StringUtils.IsEmpty(o) && a.push(o),
			t && !StringUtils_1.StringUtils.IsEmpty(t) && a.push(t),
			i && 0 < i.length)
		)
			for (const e of i) StringUtils_1.StringUtils.IsEmpty(e) || a.push(e);
		this.LoadHandleId =
			UiModelResourcesManager_1.UiModelResourcesManager.LoadUiModelResources(
				a,
				(a, n) => {
					this.uGn(), (this.ResourceLoadCache = n);
					var s = UE.NewArray(UE.SkeletalMesh),
						d = this.GetLoadedResource(o);
					s.Add(d), (n = this.GetLoadedResource(t));
					let l;
					if (i) {
						l = [];
						for (const e of i) {
							var r = this.GetLoadedResource(e);
							l.push(r), s.Add(d);
						}
					}
					this.UiModelActorComponent?.ChangeMesh(d, n, l),
						e
							? (this.aGn =
									UiModelResourcesManager_1.UiModelResourcesManager.LoadMeshesComponentsBundleStreaming(
										s,
										void 0,
										() => {
											this.FinishLoad(),
												this.UiModelDataComponent?.SetVisible(!0, !0);
										},
									))
							: (this.FinishLoad(), this._Gn.Empty());
				},
			);
	}
	FinishLoad() {
		this.UiModelDataComponent?.SetModelLoadState(2);
		var e = this.UiModelDataComponent?.GetDitherEffectValue() ?? 1;
		this.UiModelDataComponent?.SetDitherEffect(e), this.LoadFinishCallBack?.();
	}
	CancelLoad() {
		1 === this.UiModelDataComponent?.GetModelLoadState() &&
			UiModelResourcesManager_1.UiModelResourcesManager.CancelUiModelResourceLoad(
				this.LoadHandleId,
			),
			(this.ResourceLoadCache = void 0),
			this.UiModelDataComponent?.SetModelLoadState(0);
	}
	GetLoadedResource(e) {
		if (this.ResourceLoadCache) return this.ResourceLoadCache.get(e);
	}
	uGn() {
		this.aGn !==
			UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue &&
			(UiModelResourcesManager_1.UiModelResourcesManager.ReleaseMeshesComponentsBundleStreaming(
				this.aGn,
			),
			(this.aGn =
				UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue));
	}
};
(UiModelLoadComponent = __decorate(
	[(0, UiModelComponentDefine_1.RegisterUiModelComponent)(2)],
	UiModelLoadComponent,
)),
	(exports.UiModelLoadComponent = UiModelLoadComponent);
