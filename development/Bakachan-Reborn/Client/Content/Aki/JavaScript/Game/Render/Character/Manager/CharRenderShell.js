"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharRenderShell = void 0);
const cpp_1 = require("cpp"),
	PerformanceController_1 = require("../../../../Core/Performance/PerformanceController"),
	TickSystem_1 = require("../../../../Core/Tick/TickSystem"),
	TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
	RenderModuleConfig_1 = require("../../Manager/RenderModuleConfig");
class CharRenderShell {
	constructor() {
		this.RenderingComponent = void 0;
	}
	Init(e) {
		this.RenderingComponent = e;
	}
	Tick(e) {
		if (
			this.RenderingComponent &&
			(!TickSystem_1.TickSystem.IsPaused ||
				5 === this.RenderingComponent.RenderType ||
				0 < this.RenderingComponent.IsUiUpdate)
		) {
			let r = 0;
			PerformanceController_1.PerformanceController
				.IsEntityTickPerformanceTest &&
				(r = cpp_1.KuroTime.GetMilliseconds64()),
				this.RenderingComponent.Tick(e),
				PerformanceController_1.PerformanceController
					.IsEntityTickPerformanceTest &&
					(e = this.RenderingComponent.GetOwner()) instanceof
						TsBaseCharacter_1.default &&
					PerformanceController_1.PerformanceController.CollectComponentTickPerformanceInfo(
						e.EntityId,
						"CharRenderingComponent",
						!0,
						cpp_1.KuroTime.GetMilliseconds64() - r,
					);
		}
	}
}
exports.CharRenderShell = CharRenderShell;
