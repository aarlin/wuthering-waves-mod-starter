"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhotographModel = void 0);
const UE = require("ue"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	UiCameraPostEffectComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraPostEffectComponent"),
	UiCameraManager_1 = require("../UiCamera/UiCameraManager"),
	UiCameraPhotographerStructure_1 = require("../UiCamera/UiCameraStructure/UiCameraPhotographerStructure"),
	PhotographDefine_1 = require("./PhotographDefine");
class PhotographModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.Fji = void 0),
			(this.PlayMontageEntity = void 0),
			(this.MontageId = 0),
			(this.Vji = new Map()),
			(this.Hji = new UE.Transform()),
			(this.RightValue = 0),
			(this.UpValue = 0),
			(this.jji = 0),
			(this.Wji = void 0),
			(this.IsOpenPhotograph = !1),
			(this.SavePath = ""),
			(this.IsSaveButtonVisible = !1);
	}
	OnInit() {
		return (
			(this.SavePath =
				CommonParamById_1.configCommonParamById.GetStringConfig(
					"ScreenShotSavePath",
				)),
			!0
		);
	}
	OnClear() {
		return this.DestroyUiCamera(), !0;
	}
	OnLeaveLevel() {
		return this.DestroyUiCamera(), !0;
	}
	SpawnPhotographerStructure(t, e, i) {
		return (
			this.Hji.SetLocation(t),
			this.Hji.SetRotation(e),
			this.Hji.SetScale3D(i),
			(t = UiCameraManager_1.UiCameraManager.Get()),
			(this.Fji = t.PushStructure(
				UiCameraPhotographerStructure_1.UiCameraPhotographerStructure,
			)),
			this.Fji.SetActorTransform(this.Hji),
			t
				.GetUiCameraComponent(
					UiCameraPostEffectComponent_1.UiCameraPostEffectComponent,
				)
				.SetCameraFocalDistance(
					PhotographDefine_1.DEFAULT_MANUAL_FOCUS_DISTANCE,
				),
			this.Fji
		);
	}
	DestroyUiCamera() {
		UiCameraManager_1.UiCameraManager.Destroy(
			PhotographDefine_1.PHOTOGRAPH_CAMERA_BLEND_OUT,
		),
			(this.Fji = void 0);
	}
	GetPhotographerStructure() {
		return this.Fji;
	}
	SetPhotographOption(t, e) {
		this.Vji.set(t, e);
	}
	ClearPhotographOption() {
		this.Vji.clear();
	}
	GetPhotographOption(t) {
		return this.Vji.get(t);
	}
	GetAllPhotographOption() {
		return this.Vji;
	}
	SetEntityEnable(t, e) {
		t?.Valid &&
			t.Entity?.Valid &&
			t.Entity.Active !== e &&
			(e
				? this.Wji && t.Id === this.Wji.Id
					? (t.Entity.Enable(this.jji, "PhotographModel.SetEntityEnable"),
						(this.jji = void 0),
						(this.Wji = void 0))
					: this.ResetEntityEnable()
				: ((this.MontageId = 0),
					(this.Wji = t),
					(this.jji = t.Entity.Disable(
						"[PhotographModel.SetEntityEnable] bEnable为false",
					))));
	}
	ResetEntityEnable() {
		this.Wji &&
			this.Wji.Entity?.Enable(this.jji, "PhotographModel.ResetEntityEnable"),
			(this.jji = void 0),
			(this.Wji = void 0);
	}
}
exports.PhotographModel = PhotographModel;
