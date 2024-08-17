"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotPhotoView = void 0);
const UE = require("ue"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager");
class PlotPhotoView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.B7 = void 0),
			(this.JSt = () => {
				UiManager_1.UiManager.CloseView("PlotPhotoView");
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UIButtonComponent],
			[3, UE.UITexture],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIText],
			[7, UE.UIText],
			[8, UE.UIText],
		]),
			(this.BtnBindInfo = [[2, this.JSt]]);
	}
	OnAddEventListener() {}
	OnRemoveEventListener() {}
	OnStart() {
		this.B7 = this.OpenParam;
	}
	OnAfterShow() {
		this.GetSprite(0).SetUIActive(!1),
			this.GetSprite(1).SetUIActive(!1),
			this.GetText(4).SetUIActive(!1),
			this.GetText(6).SetUIActive(!1),
			this.GetText(7).SetUIActive(!1),
			this.GetText(8).SetUIActive(!1),
			this.GetTexture(3).SetUIActive(!1),
			this.GetText(5).SetText("test/残鸣初奏");
		var e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
		e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
			1 === e ? "PlotPhoto_Male" : "PlotPhoto_Female",
		);
		ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (e) => {
			e?.IsValid() &&
				(this.GetTexture(3).SetTexture(e), this.GetTexture(3).SetUIActive(!0));
		});
	}
	OnBeforeDestroy() {
		this.B7 && (this.B7(), (this.B7 = void 0));
	}
}
exports.PlotPhotoView = PlotPhotoView;
