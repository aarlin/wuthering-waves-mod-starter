"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharMaterialControlRuntimeDataGroup = void 0);
const MapUtils_1 = require("../../../../../Core/Utils/MapUtils"),
	RenderModuleController_1 = require("../../../Manager/RenderModuleController");
class CharMaterialControlRuntimeDataGroup {
	constructor() {
		(this.CharRenderingComponent = void 0),
			(this.DataGroup = void 0),
			(this.IsDead = !1),
			(this.DataMap = void 0),
			(this.war = void 0),
			(this.Bhr = void 0),
			(this.bhr = void 0),
			(this.qhr = -0),
			(this.Ghr = !1),
			(this.Nhr = !1);
	}
	Init(t, a) {
		(this.CharRenderingComponent = t),
			(this.DataGroup = a),
			(this.DataMap = new Map()),
			(this.war = []),
			(this.Bhr = []),
			(this.bhr = []),
			(this.IsDead = !1),
			(this.qhr = 0),
			(this.Ghr = !1),
			MapUtils_1.MapUtils.ForEach(this.DataGroup.DataMap, (a, r) => {
				this.qhr < r && (this.qhr = r),
					(this.Ghr = this.Ghr || 1 === a.DataType),
					0 < r
						? this.DataMap.set(a, r)
						: this.Bhr.push(t.AddMaterialControllerData(a));
			});
	}
	BeforeUpdateState(t, a) {
		this.Nhr || (this.Nhr = this.DataGroup.IgnoreTimeDilation);
		let r = t;
		if (
			this.Nhr ||
			!RenderModuleController_1.RenderModuleController.IsGamePaused
		) {
			if (
				(this.Nhr || (r = t * a),
				(this.qhr -= r),
				this.DataMap.forEach((t, a) => {
					(t -= r) <= 0
						? (this.Bhr.push(
								this.CharRenderingComponent.AddMaterialControllerData(a),
							),
							this.war.push(a))
						: this.DataMap.set(a, t);
				}),
				0 < this.war.length)
			)
				for (const t of this.war) this.DataMap.delete(t);
			this.war = [];
		}
	}
	AfterUpdateState(t) {
		if (!this.Ghr && this.qhr <= 0) {
			this.bhr = [];
			for (let t = 0; t < this.Bhr.length; t++)
				this.CharRenderingComponent.IsMaterialControllerDataValid(
					this.Bhr[t],
				) && this.bhr.push(this.Bhr[t]);
			(this.Bhr = this.bhr),
				(this.IsDead = 0 === this.Bhr.length && 0 === this.DataMap.size);
		}
	}
	EndState() {
		(this.war = []),
			this.DataMap.clear(),
			this.Bhr.forEach((t) => {
				this.CharRenderingComponent.RemoveMaterialControllerData(t);
			}),
			(this.IsDead = !0);
	}
	EndStateWithEnding() {
		(this.war = []),
			this.DataMap.clear(),
			this.Bhr.forEach((t) => {
				this.CharRenderingComponent.RemoveMaterialControllerDataWithEnding(t);
			}),
			(this.IsDead = !0);
	}
}
exports.CharMaterialControlRuntimeDataGroup =
	CharMaterialControlRuntimeDataGroup;
