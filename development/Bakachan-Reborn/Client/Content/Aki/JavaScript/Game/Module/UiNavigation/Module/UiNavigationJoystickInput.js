"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiNavigationJoystickInput = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
	UiNavigationLogic_1 = require("../New/UiNavigationLogic");
class UiNavigationJoystickInput {
	static Tick(i) {
		var t = ModelManager_1.ModelManager.InputDistributeModel.GetAxisValue(
				InputMappingsDefine_1.axisMappings.NavigationTopDown,
			),
			o = ModelManager_1.ModelManager.InputDistributeModel.GetAxisValue(
				InputMappingsDefine_1.axisMappings.NavigationLeftRight,
			),
			n = this.yxo(o),
			s = this.yxo(t);
		if (!n || !s || this.f_t) {
			if (
				this.f_t &&
				(this.Ixo(o, t), (n = this.Txo(o)), (s = this.Txo(t)), n && s)
			)
				return (this.f_t = !1), this.Lxo(), void this.Dxo();
			this.Rxo(o, t),
				this.Uxo(i),
				(this.Axo = o),
				(this.Pxo = t),
				(this.f_t = !0);
		}
	}
	static Rxo(i, t) {
		this.cz.Set(i, t, 0),
			-143 <= (i = Vector_1.Vector.GetAngleByVector2D(this.cz)) && i < -37
				? this.xxo(InputMappingsDefine_1.actionMappings.Ui方向下)
				: -37 <= i && i < 37
					? this.xxo(InputMappingsDefine_1.actionMappings.Ui方向右)
					: 37 <= i && i < 143
						? this.xxo(InputMappingsDefine_1.actionMappings.Ui方向上)
						: this.xxo(InputMappingsDefine_1.actionMappings.Ui方向左);
	}
	static yxo(i) {
		return Math.abs(i) < this.wxo;
	}
	static Txo(i) {
		return Math.abs(i) < this.Bxo;
	}
	static xxo(i) {
		i !== this.nCt &&
			((this.nCt = i),
			(this.bxo = !1),
			(this.qxo = 0),
			(this.Gxo = this.Nxo),
			(this.Oxo = 1),
			UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(
				this.nCt,
				0,
			));
	}
	static Dxo() {
		var i = this.nCt;
		StringUtils_1.StringUtils.IsBlank(i) ||
			((this.nCt = ""),
			(this.qxo = 0),
			(this.Axo = 0),
			(this.Pxo = 0),
			(this.bxo = !1),
			UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(i, 1));
	}
	static Uxo(i) {
		StringUtils_1.StringUtils.IsBlank(this.nCt) ||
			((this.qxo += i),
			0 === this.Oxo
				? this.qxo > this.kxo &&
					((this.qxo -= this.kxo),
					(this.Gxo = this.Fxo),
					(this.Oxo = 1),
					UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(
						this.nCt,
						0,
					))
				: 1 === this.Oxo &&
					this.qxo > this.Gxo &&
					((this.qxo -= this.Gxo),
					(this.Oxo = 0),
					UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(
						this.nCt,
						1,
					)));
	}
	static Ixo(i, t) {
		let o = 0,
			n = 0;
		(n =
			this.nCt === InputMappingsDefine_1.actionMappings.Ui方向右 ||
			this.nCt === InputMappingsDefine_1.actionMappings.Ui方向上
				? ((o = this.Axo - i), this.Pxo - t)
				: ((o = i - this.Axo), t - this.Pxo)),
			(o > this.Vxo || n > this.Vxo) && (this.bxo = !0);
	}
	static Lxo() {
		if (this.bxo) {
			if (StringUtils_1.StringUtils.IsBlank(this.nCt)) return;
			var i = this.Hxo.get(this.nCt);
			for (const o of this.jxo) {
				var t = o[0];
				o[1] || t(i);
			}
		}
		for (const i of this.jxo) this.jxo.set(i[0], !1);
	}
	static RegisterLeftJoystickFunction(i) {
		this.jxo.set(i, this.f_t);
	}
	static UnRegisterLeftJoystickFunction(i) {
		this.jxo.delete(i);
	}
}
((exports.UiNavigationJoystickInput = UiNavigationJoystickInput).wxo = 0.6),
	(UiNavigationJoystickInput.Bxo = 0.2),
	(UiNavigationJoystickInput.Vxo = 0.3),
	(UiNavigationJoystickInput.nCt = ""),
	(UiNavigationJoystickInput.Nxo = 500),
	(UiNavigationJoystickInput.Fxo = 100),
	(UiNavigationJoystickInput.kxo = 100),
	(UiNavigationJoystickInput.Gxo = 0),
	(UiNavigationJoystickInput.qxo = 0),
	(UiNavigationJoystickInput.Oxo = void 0),
	(UiNavigationJoystickInput.cz = Vector_1.Vector.Create()),
	(UiNavigationJoystickInput.f_t = !1),
	(UiNavigationJoystickInput.Hxo = new Map([
		[InputMappingsDefine_1.actionMappings.Ui方向下, 0],
		[InputMappingsDefine_1.actionMappings.Ui方向右, 3],
		[InputMappingsDefine_1.actionMappings.Ui方向上, 1],
		[InputMappingsDefine_1.actionMappings.Ui方向左, 2],
	])),
	(UiNavigationJoystickInput.jxo = new Map()),
	(UiNavigationJoystickInput.Axo = 0),
	(UiNavigationJoystickInput.Pxo = 0),
	(UiNavigationJoystickInput.bxo = !1);
