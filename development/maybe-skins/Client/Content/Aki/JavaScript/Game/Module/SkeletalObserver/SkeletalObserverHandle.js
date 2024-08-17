"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkeletalObserverHandle = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../GlobalData"),
	UiSceneManager_1 = require("../UiComponent/UiSceneManager");
class SkeletalObserverHandle {
	constructor() {
		this.dSo = void 0;
	}
	get Model() {
		return this.dSo?.Model;
	}
	CreateSkeletalObserverHandle(e) {
		var a = UE.GameplayStatics.BeginDeferredActorSpawnFromClass(
			GlobalData_1.GlobalData.World,
			UE.TsSkeletalObserver_C.StaticClass(),
			MathUtils_1.MathUtils.DefaultTransform,
			1,
		);
		UE.GameplayStatics.FinishSpawningActor(
			a,
			MathUtils_1.MathUtils.DefaultTransform,
		),
			(this.dSo = a).Init(e);
	}
	ResetSkeletalObserverHandle() {
		this.dSo?.Destroy();
	}
	AddUiShowRoomShowActor(e) {
		var a = this.dSo;
		UiSceneManager_1.UiSceneManager.AddUiShowRoomShowActor(a, e);
	}
}
exports.SkeletalObserverHandle = SkeletalObserverHandle;
