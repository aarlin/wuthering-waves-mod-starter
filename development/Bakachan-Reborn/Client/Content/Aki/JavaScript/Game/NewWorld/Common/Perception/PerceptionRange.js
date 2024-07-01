"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PerceptionRange = void 0);
const cpp_1 = require("cpp"),
	Log_1 = require("../../../../Core/Common/Log"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector");
class PerceptionRange {
	constructor() {
		(this.$ir = void 0),
			(this.w_e = void 0),
			(this.Yir = void 0),
			(this.Jir = void 0),
			(this.U7o = Vector_1.Vector.Create()),
			(this.zir = 0),
			(this.Zir = void 0),
			(this.eor = (i) => !!this.$ir && this.$ir(i)),
			(this.tor = (i) => {
				this.Zir && this.Zir.add(i.Id), this.w_e && this.w_e(i);
			}),
			(this.ior = (i) => {
				this.Zir && this.Zir.delete(i.Id), this.Yir && this.Yir(i);
			}),
			(this.oor = () => (
				this.Jir && this.U7o.DeepCopy(this.Jir()), this.U7o.ToUeVector()
			));
	}
	InitStatic(i, r, o, e = !1, t = void 0, s = void 0, h = void 0) {
		0 !== this.zir
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("Perception", 37, "重复初始化静态感知范围")
			: e || s || h
				? (e && (this.Zir = new Set()),
					(this.$ir = t),
					(this.w_e = s),
					(this.Yir = h),
					(this.zir = cpp_1.FKuroPerceptionInterface.AddStaticPerceptionRange(
						i.ToUeVector(),
						r,
						o,
						this,
						this.$ir ? this.eor : void 0,
						this.w_e ? this.tor : void 0,
						this.Yir ? this.ior : void 0,
					)),
					0 === this.zir &&
						Log_1.Log.CheckError() &&
						Log_1.Log.Error("Perception", 37, "初始化静态感知范围失败"))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Perception", 37, "初始化的静态感知范围没有意义");
	}
	InitDynamic(i, r, o, e = void 0, t = void 0, s = void 0, h = void 0, c = !1) {
		i
			? r <= 0
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Perception",
						37,
						"初始化动态感知范围时，感知范围大小非法",
					)
				: 0 !== this.zir
					? Log_1.Log.CheckError() &&
						Log_1.Log.Error("Perception", 37, "重复初始化动态感知范围")
					: c || e || t
						? ((this.Jir = h),
							(this.$ir = s),
							(this.w_e = e),
							(this.Yir = t),
							(this.zir =
								cpp_1.FKuroPerceptionInterface.AddDynamicPerceptionRange(
									i,
									r,
									o,
									this,
									this.oor,
									this.$ir ? this.eor : void 0,
									this.w_e ? this.tor : void 0,
									this.Yir ? this.ior : void 0,
								)),
							0 === this.zir &&
								Log_1.Log.CheckError() &&
								Log_1.Log.Error("Perception", 37, "初始化动态感知范围失败"))
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error("Perception", 37, "初始化的动态感知范围没有意义")
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Perception",
					37,
					"初始化动态感知范围绑定的实体Token非法",
				);
	}
	Clear() {
		(this.$ir = void 0),
			(this.w_e = void 0),
			(this.Yir = void 0),
			(this.Jir = void 0),
			this.U7o.Reset(),
			(this.Zir = void 0),
			0 !== this.zir &&
				(cpp_1.FKuroPerceptionInterface.RemovePerceptionRange(this.zir),
				(this.zir = 0));
	}
	UpdateRange(i) {
		0 !== this.zir &&
			(i <= 0
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Perception",
						37,
						"更新动态感知范围大小时，感知范围大小非法",
					)
				: cpp_1.FKuroPerceptionInterface.UpdatePerceptionRange(this.zir, i));
	}
}
exports.PerceptionRange = PerceptionRange;
