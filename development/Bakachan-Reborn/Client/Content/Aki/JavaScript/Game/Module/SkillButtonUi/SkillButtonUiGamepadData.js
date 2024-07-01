"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillButtonUiGamepadData = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	InputEnums_1 = require("../../Input/InputEnums"),
	InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
	UiManager_1 = require("../../Ui/UiManager"),
	BehaviorButtonData_1 = require("./BehaviorButtonData"),
	mainKeys = [
		"Gamepad_FaceButton_Top",
		"Gamepad_FaceButton_Left",
		"Gamepad_FaceButton_Bottom",
		"Gamepad_FaceButton_Right",
	],
	MAIN_KEY_NUM = 4,
	subKeys = [
		"Gamepad_LeftTrigger",
		"Gamepad_RightTrigger",
		"Gamepad_LeftShoulder",
		"Gamepad_RightShoulder",
	],
	SUB_KEY_NUM = 3,
	actionNameToButtonTypeMap = new Map([
		[InputMappingsDefine_1.actionMappings.跳跃, 1],
		[InputMappingsDefine_1.actionMappings.攀爬, 2],
		[InputMappingsDefine_1.actionMappings.攻击, 4],
		[InputMappingsDefine_1.actionMappings.闪避, 5],
		[InputMappingsDefine_1.actionMappings.技能1, 6],
		[InputMappingsDefine_1.actionMappings.幻象1, 7],
		[InputMappingsDefine_1.actionMappings.大招, 8],
		[InputMappingsDefine_1.actionMappings.幻象2, 9],
		[InputMappingsDefine_1.actionMappings.瞄准, 101],
		[InputMappingsDefine_1.actionMappings.通用交互, 104],
		[InputMappingsDefine_1.actionMappings.任务追踪, 105],
	]),
	initActionNames = [
		InputMappingsDefine_1.actionMappings.跳跃,
		InputMappingsDefine_1.actionMappings.攻击,
		InputMappingsDefine_1.actionMappings.闪避,
		InputMappingsDefine_1.actionMappings.技能1,
		InputMappingsDefine_1.actionMappings.幻象1,
		InputMappingsDefine_1.actionMappings.大招,
		InputMappingsDefine_1.actionMappings.幻象2,
		InputMappingsDefine_1.actionMappings.瞄准,
		InputMappingsDefine_1.actionMappings.通用交互,
	],
	climbingButtonTypeSet = new Set([1, 2, 4, 5, 7, 104]),
	inWaterButtonTypeSet = new Set([5, 7, 104]),
	subButtonTypeSet = new Set([6, 8, 7, 9, 11, 101]);
class SkillButtonUiGamepadData {
	constructor() {
		(this.GEo = []),
			(this.NEo = new Map()),
			(this.NoneIcon = ""),
			(this.SwimIcon = ""),
			(this.ButtonKeyList = []),
			(this.OEo = new Map()),
			(this.kEo = new Map()),
			(this.CurButtonTypeList = []),
			(this.CombineButtonKey = ""),
			(this.MainSkillButtonTypeList = []),
			(this.MainSkillCombineButtonTypeList = []),
			(this.SubSkillButtonTypeList = []),
			(this.SubAimSkillButtonTypeList = []),
			(this.FEo = 1),
			(this.VEo = void 0),
			(this.HEo = void 0),
			(this.jEo = void 0),
			(this.WEo = void 0),
			(this.KEo = void 0),
			(this.QEo = !1),
			(this.XEo = !1),
			(this.$Eo = !1),
			(this.YEo = !1),
			(this.JEo = !1),
			(this.Climbing = !1),
			(this.InWater = !1),
			(this.ControlCameraByMoveAxis = !1);
	}
	Init() {
		(this.QEo = !1),
			this.zEo(),
			this.ZEo(),
			this.eyo(),
			this.RefreshBaseConfigByUserSetting(),
			this.RefreshButtonData();
	}
	Clear() {
		this.ControlCameraByMoveAxis = !1;
	}
	zEo() {
		for (var [t] of ((this.GEo.length = 0), actionNameToButtonTypeMap))
			this.GEo.push(t);
		this.GEo.push(InputMappingsDefine_1.actionMappings.手柄主攻击),
			this.GEo.push(InputMappingsDefine_1.actionMappings.手柄副攻击);
	}
	GetAllActionNameList() {
		return this.GEo;
	}
	ZEo() {
		(this.NoneIcon =
			ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				"SP_IconXboxNoneIcon",
			)),
			(this.SwimIcon =
				ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
					"SP_IconSwimming",
				));
	}
	eyo() {
		this.tyo(
			InputMappingsDefine_1.actionMappings.瞄准,
			InputEnums_1.EInputAction.瞄准,
		),
			this.tyo(
				InputMappingsDefine_1.actionMappings.通用交互,
				InputEnums_1.EInputAction.通用交互,
			);
	}
	tyo(t, i) {
		t = actionNameToButtonTypeMap.get(t);
		var e = new BehaviorButtonData_1.BehaviorButtonData();
		return e.Refresh(t, i, void 0, void 0), this.NEo.set(t, e), e;
	}
	RefreshBaseConfigByUserSetting() {
		this.CombineButtonKey = "Gamepad_LeftShoulder";
		let t = 0;
		for (const i of mainKeys) (this.ButtonKeyList[t] = i), t++;
		for (const i of subKeys)
			i !== this.CombineButtonKey &&
				("Gamepad_RightTrigger" === i && (this.FEo = t - 4),
				(this.ButtonKeyList[t] = i),
				t++);
		(this.ButtonKeyList[t] = "Gamepad_RightThumbstick"),
			(this.VEo = void 0),
			(this.HEo = void 0),
			(this.jEo = void 0),
			(this.WEo = void 0),
			(this.KEo = void 0),
			this.OEo.clear();
		for (const t of initActionNames) {
			var i = InputSettingsManager_1.InputSettingsManager.GetActionBinding(t);
			if (i) {
				var e = [];
				if ((i.GetKeyNameList(e), e)) {
					for (const i of e)
						this.ButtonKeyList.includes(i) &&
							(this.OEo.set(i, t), "Gamepad_RightTrigger" === i) &&
							((this.VEo = t),
							(this.HEo = e.concat()),
							(this.jEo = e.concat()),
							this.jEo.splice(this.jEo.indexOf(i), 1),
							this.jEo.splice(
								this.jEo.indexOf("GenericUSBController_Button8"),
								1,
							),
							this.jEo.push("Gamepad_RightThumbstick"),
							this.jEo.push("GenericUSBController_Button12"));
					t === InputMappingsDefine_1.actionMappings.攻击 &&
						((this.WEo = e.concat()),
						(this.KEo = this.WEo.concat()),
						this.KEo.push("Gamepad_RightTrigger"),
						this.KEo.push("GenericUSBController_Button8"));
				}
			}
		}
		this.kEo.clear();
		for (const t of initActionNames) {
			var n =
				InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
					t,
				);
			if (n) {
				var o,
					a,
					s = new Map();
				for ([o, a] of (n.GetKeyMap(s), s))
					o === this.CombineButtonKey &&
						this.ButtonKeyList.includes(a) &&
						this.kEo.set(a, t);
			}
		}
		this.iyo(), this.oyo();
	}
	iyo() {
		var t = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
				InputMappingsDefine_1.actionMappings.手柄主攻击,
			),
			i = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
				InputMappingsDefine_1.actionMappings.攻击,
			),
			e = [],
			n = [];
		if (
			(t?.GetGamepadKeyNameList(e),
			i?.GetGamepadKeyNameList(n),
			!this.ryo(e, n))
		) {
			let t = [];
			(t = t.concat(n))
				? InputSettingsManager_1.InputSettingsManager.SetActionKeys(
						InputMappingsDefine_1.actionMappings.手柄主攻击,
						t,
					)
				: InputSettingsManager_1.InputSettingsManager.SetActionKeys(
						InputMappingsDefine_1.actionMappings.手柄主攻击,
						[],
					);
		}
		if (
			((t =
				InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
					InputMappingsDefine_1.actionMappings.手柄主攻击,
				)),
			(i =
				InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
					InputMappingsDefine_1.actionMappings.攻击,
				)),
			(e = new Map()),
			(n = new Map()),
			t?.GetGamepadKeyNameMap(e),
			i?.GetGamepadKeyNameMap(n),
			!this.nyo(e, n))
		) {
			if (e)
				for (var [o, a] of e)
					InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(
						InputMappingsDefine_1.actionMappings.手柄主攻击,
						o,
						a,
					);
			if (n)
				for (var [s, p] of n)
					InputSettingsManager_1.InputSettingsManager.AddCombinationActionKeyMap(
						InputMappingsDefine_1.actionMappings.手柄主攻击,
						s,
						p,
					);
		}
	}
	ryo(t, i) {
		if (t !== i) {
			if (!t || !i) return !1;
			if (t.length !== i.length) return !1;
			for (let e = 0; e < t.length; e++) if (t[e] !== i[e]) return !1;
		}
		return !0;
	}
	nyo(t, i) {
		if (t !== i) {
			if (!t || !i) return !1;
			if (t.size !== i.size) return !1;
			for (var [e, n] of t) if (i.get(e) !== n) return !1;
		}
		return !0;
	}
	oyo() {
		this.MainSkillButtonTypeList.length = 4;
		for (let t = 0; t < 4; t++)
			(this.MainSkillButtonTypeList[t] = this.syo(t, !1)),
				(this.MainSkillCombineButtonTypeList[t] = this.syo(t, !0));
		this.SubSkillButtonTypeList.length = 3;
		for (let t = 0; t < 3; t++)
			this.SubSkillButtonTypeList[t] = this.syo(4 + t, !1);
		this.SubAimSkillButtonTypeList.length = 4;
		for (let t = 0; t < 3; t++)
			this.SubAimSkillButtonTypeList[t] = this.SubSkillButtonTypeList[t];
		(this.SubAimSkillButtonTypeList[this.FEo] = 11),
			(this.SubAimSkillButtonTypeList[3] =
				this.SubSkillButtonTypeList[this.FEo]);
	}
	syo(t, i) {
		let e;
		return (
			(t = this.ButtonKeyList[t]),
			((e = (e = i ? this.kEo.get(t) : e) || this.OEo.get(t)) &&
				actionNameToButtonTypeMap.get(e)) ||
				0
		);
	}
	RefreshButtonData() {
		this.ayo();
		for (let t = (this.CurButtonTypeList.length = 0); t < 4; t++) {
			let i;
			(101 ===
				(i = (
					this.QEo
						? this.MainSkillCombineButtonTypeList
						: this.MainSkillButtonTypeList
				)[t]) ||
				this.hyo(i)) &&
			this.lyo(i)
				? this.CurButtonTypeList.push(i)
				: this.CurButtonTypeList.push(0);
		}
		if (this.XEo)
			for (let t = 0; t < 4; t++) this._yo(this.SubAimSkillButtonTypeList[t]);
		else {
			for (let t = 0; t < 3; t++) this._yo(this.SubSkillButtonTypeList[t]);
			this.CurButtonTypeList.push(void 0);
		}
		var t;
		this.Climbing &&
			-1 !== (t = this.CurButtonTypeList.indexOf(4)) &&
			(this.CurButtonTypeList[t] = 2),
			ModelManager_1.ModelManager.SkillButtonUiModel.GetButtonTypeList().includes(
				12,
			) &&
				0 <= (t = this.CurButtonTypeList.indexOf(101)) &&
				(this.CurButtonTypeList[t] = 12),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Battle", 18, "RefreshGamepadButton", [
					"",
					this.CurButtonTypeList,
				]);
	}
	lyo(t) {
		return !(
			(this.Climbing && !climbingButtonTypeSet.has(t)) ||
			(this.InWater && !inWaterButtonTypeSet.has(t))
		);
	}
	hyo(t) {
		var i;
		return (
			!!t &&
			((i =
				ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonDataByButton(
					t,
				))
				? i.IsVisible()
				: this.GetBehaviorButtonDataByButtonType(t)?.IsVisible)
		);
	}
	_yo(t) {
		this.Climbing || this.InWater
			? this.lyo(t)
				? this.CurButtonTypeList.push(t)
				: this.CurButtonTypeList.push(void 0)
			: subButtonTypeSet.has(t)
				? this.CurButtonTypeList.push(t)
				: this.CurButtonTypeList.push(void 0);
	}
	ayo() {
		var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		t?.Valid &&
			((t = t.Entity.CheckGetComponent(185)),
			(this.Climbing = t.HasTag(504239013)),
			(this.InWater = t.HasTag(855966206)));
	}
	GetButtonTypeByActionName(t) {
		return actionNameToButtonTypeMap.get(t);
	}
	IsAim() {
		return 1 === this.GetBehaviorButtonDataByButtonType(101)?.State;
	}
	SetIsPressCombineButton(t) {
		this.QEo !== t && ((this.QEo = t), this.RefreshButtonData());
	}
	GetIsPressCombineButton() {
		return this.QEo;
	}
	GetBehaviorButtonDataByButtonType(t) {
		return this.NEo.get(t);
	}
	RefreshSkillButtonData(t) {
		1 === t &&
			(this.RefreshAimButtonVisible(),
			this.uyo(),
			this.ChangeSkillOnAimStateChange(),
			this.RefreshButtonData());
	}
	RefreshAimState() {
		var t = this.uyo();
		return (
			t && (this.ChangeSkillOnAimStateChange(), this.RefreshButtonData()), t
		);
	}
	uyo() {
		var t,
			i,
			e = this.GetBehaviorButtonDataByButtonType(101);
		return (
			!!e &&
			!!(t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)
				?.Valid &&
			((t = t.Entity.GetComponent(158).DirectionState),
			(i = e.State),
			t === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection
				? (e.State = 1)
				: (e.State = 0),
			i !== e.State)
		);
	}
	RefreshAimButtonVisible() {
		var t,
			i = this.GetBehaviorButtonDataByButtonType(101);
		i &&
			((t =
				ModelManager_1.ModelManager.SkillButtonUiModel.GetCurSkillButtonEntityData())
				? i.RefreshIsVisible(t.GameplayTagComponent, t.RoleConfig)
				: (i.IsVisible = !1));
	}
	ChangeSkillOnAimStateChange() {
		this.IsAim() !== this.XEo && this.cyo();
	}
	cyo() {
		this.JEo ||
			((this.JEo = !0),
			(this.XEo = !this.XEo),
			this.XEo
				? (this.VEo
						? InputSettingsManager_1.InputSettingsManager.SetActionKeys(
								this.VEo,
								this.jEo.concat(),
							)
						: Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Battle",
								18,
								"手柄RT没有绑定任何输入，瞄准时不需要更换原有按键绑定",
							),
					this.KEo
						? InputSettingsManager_1.InputSettingsManager.SetActionKeys(
								InputMappingsDefine_1.actionMappings.攻击,
								this.KEo.concat(),
							)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Battle",
								18,
								"攻击输入没有绑定任何按键，瞄准时使RT键生效",
							))
				: (this.VEo &&
						InputSettingsManager_1.InputSettingsManager.SetActionKeys(
							this.VEo,
							this.HEo.concat(),
						),
					InputSettingsManager_1.InputSettingsManager.SetActionKeys(
						InputMappingsDefine_1.actionMappings.攻击,
						this.WEo.concat(),
					)),
			(this.JEo = !1));
	}
	RefreshInteractBehaviorData() {
		var t = this.GetBehaviorButtonDataByButtonType(104),
			i = UiManager_1.UiManager.IsViewOpen("InteractionHintView");
		t.IsEnable = i;
	}
	OnActionKeyChanged(t) {
		if (this.$Eo)
			return this.YEo
				? void 0
				: void (initActionNames.includes(t) && (this.YEo = !0));
		this.JEo ||
			(initActionNames.includes(t) &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Battle", 18, "在未知情况下触发了改键"));
	}
	OnOpenMenuView() {
		this.XEo && this.cyo(), (this.$Eo = !0);
	}
	OnCloseMenuView() {
		(this.$Eo = !1),
			this.YEo && ((this.YEo = !1), this.Fxi()),
			this.IsAim() !== this.XEo && this.cyo();
	}
	Fxi() {
		this.RefreshBaseConfigByUserSetting(),
			this.RefreshButtonData(),
			ModelManager_1.ModelManager.PlatformModel?.IsGamepad() &&
				ModelManager_1.ModelManager.SkillButtonUiModel?.GetCurSkillButtonEntityData()?.RefreshSkillButtonData(
					2,
				);
	}
}
exports.SkillButtonUiGamepadData = SkillButtonUiGamepadData;
