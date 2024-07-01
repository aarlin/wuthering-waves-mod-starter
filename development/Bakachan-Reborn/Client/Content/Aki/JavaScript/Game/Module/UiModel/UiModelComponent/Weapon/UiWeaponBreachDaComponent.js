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
	(exports.UiWeaponBreachDaComponent = void 0);
const UE = require("ue"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	ModelUtil_1 = require("../../../../../Core/Utils/ModelUtil"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
	UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiWeaponBreachDaComponent = class extends UiModelComponentBase_1.UiModelComponentBase {
	constructor() {
		super(...arguments),
			(this.Qwr = void 0),
			(this.nXt = void 0),
			(this.ZBr = void 0),
			(this.KY = () => {
				var e = this.ZBr?.WeaponData?.GetBreachLevel() ?? 0;
				this.RefreshWeaponBreachDa(e);
			});
	}
	OnInit() {
		(this.Qwr = this.Owner.CheckGetComponent(0)),
			(this.nXt = this.Owner.CheckGetComponent(1)),
			(this.ZBr = this.Owner.CheckGetComponent(18));
	}
	OnStart() {
		EventSystem_1.EventSystem.AddWithTarget(
			this.Owner,
			EventDefine_1.EEventName.OnUiModelLoadComplete,
			this.KY,
		);
	}
	OnEnd() {
		EventSystem_1.EventSystem.RemoveWithTarget(
			this.Owner,
			EventDefine_1.EEventName.OnUiModelLoadComplete,
			this.KY,
		);
	}
	RefreshWeaponBreachDa(e) {
		ModelManager_1.ModelManager.WeaponModel.BlueprintWeaponBreachLevel = e;
		var t = ModelUtil_1.ModelUtil.GetModelConfig(
			this.Qwr.ModelConfigId,
		)?.DA?.AssetPathName.toString();
		t &&
			!StringUtils_1.StringUtils.IsBlank(t) &&
			ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Object, (t) => {
				var n;
				t &&
					((n = this.nXt?.MainMeshComponent),
					t instanceof UE.PD_WeaponLevelMaterialDatas_C) &&
					UE.BP_CharacterRenderingFunctionLibrary_C.ApplyWeaponLevelMaterial(
						n,
						t,
						e,
						n,
					);
			});
	}
};
(UiWeaponBreachDaComponent = __decorate(
	[(0, UiModelComponentDefine_1.RegisterUiModelComponent)(19)],
	UiWeaponBreachDaComponent,
)),
	(exports.UiWeaponBreachDaComponent = UiWeaponBreachDaComponent);
