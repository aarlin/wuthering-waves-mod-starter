"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleUiSpecialEnergyBarData =
		exports.SpecialEnergyBarInfo =
		exports.SpecialEnergyBarKeyInfo =
			void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	GlobalData_1 = require("../../GlobalData"),
	ModelManager_1 = require("../../Manager/ModelManager");
class SpecialEnergyBarKeyInfo {
	constructor() {
		(this.Action = 0), (this.ActionType = 0);
	}
}
exports.SpecialEnergyBarKeyInfo = SpecialEnergyBarKeyInfo;
class SpecialEnergyBarInfo {
	constructor() {
		(this.Id = 0),
			(this.PrefabType = 0),
			(this.SlotNum = 0),
			(this.ExtraFloatParams = []),
			(this.PrefabPath = ""),
			(this.AttributeId = 0),
			(this.MaxAttributeId = 0),
			(this.BuffId = 0n),
			(this.KeyEnableTagId = 0),
			(this.TagEnergyBarIdMap = void 0),
			(this.EffectColor = void 0),
			(this.PointColor = void 0),
			(this.IconPath = void 0),
			(this.EnableIconPath = void 0),
			(this.NiagaraPathList = []),
			(this.KeyEnableNiagaraIndex = 0),
			(this.KeyType = 0),
			(this.DisableKeyOnPercent = 0),
			(this.KeyInfoList = []);
	}
	Init(e, t) {
		(this.Id = e),
			(this.PrefabType = t.PrefabType),
			(this.SlotNum = t.SlotNum),
			this.oXe(t.ExtraFloatParams, this.ExtraFloatParams),
			(this.PrefabPath = t.PrefabPath.ToAssetPathName()),
			(this.AttributeId = t.AttributeId),
			(this.MaxAttributeId = t.MaxAttributeId),
			(this.BuffId = t.BuffId),
			(this.TagEnergyBarIdMap = this.rXe(t.TagEnergyBarIdMap)),
			(this.EffectColor = StringUtils_1.StringUtils.IsEmpty(t.EffectColor)
				? void 0
				: t.EffectColor),
			(this.PointColor = StringUtils_1.StringUtils.IsEmpty(t.PointColor)
				? void 0
				: t.PointColor),
			(this.IconPath = t.IconPath.ToAssetPathName()),
			(this.EnableIconPath = t.EnableIconPath.ToAssetPathName()),
			this.CGn(t.NiagaraList, this.NiagaraPathList),
			(this.KeyEnableNiagaraIndex = t.KeyEnableNiagaraIndex),
			this.KeyEnableNiagaraIndex >= this.NiagaraPathList.length &&
				((this.KeyEnableNiagaraIndex = -1), Log_1.Log.CheckError()) &&
				Log_1.Log.Error(
					"Battle",
					18,
					"能量条配置错误, 可用时粒子特效索引超出粒子数组长度",
					["", t.Name],
					["索引", this.KeyEnableNiagaraIndex],
					["数组长度", this.NiagaraPathList.length],
				),
			(this.KeyType = t.KeyType),
			(this.DisableKeyOnPercent = t.DisableKeyOnPercent / 100),
			t.KeyEnableTag && t.KeyEnableTag?.TagName !== StringUtils_1.NONE_STRING
				? (this.KeyEnableTagId = t.KeyEnableTag.TagId)
				: (this.KeyEnableTagId = 0),
			this.nXe(t.KeyInfoList);
	}
	nXe(e) {
		if (2 === ModelManager_1.ModelManager.PlatformModel.OperationType) {
			var t = e.Num();
			for (let r = 0; r < t; r++) {
				var a = e.Get(r),
					i = new SpecialEnergyBarKeyInfo();
				(i.Action = a.Action),
					(i.ActionType = a.ActionType),
					this.KeyInfoList.push(i);
			}
		}
	}
	rXe(e) {
		var t = new Map(),
			a = e.Num();
		if (!(a <= 0))
			for (let o = 0; o < a; o++) {
				var i = e.GetKey(o),
					r = e.Get(i);
				t.set(i.TagId, r);
			}
		return t;
	}
	oXe(e, t) {
		var a = e.Num();
		if (!(a <= 0))
			for (let r = 0; r < a; r++) {
				var i = e.Get(r);
				t.push(i);
			}
	}
	CGn(e, t) {
		var a = e.Num();
		if (!(a <= 0))
			for (let r = 0; r < a; r++) {
				var i = e.Get(r);
				t.push(i.ToAssetPathName());
			}
	}
}
exports.SpecialEnergyBarInfo = SpecialEnergyBarInfo;
class BattleUiSpecialEnergyBarData {
	constructor() {
		(this.IsOpenLog = !1),
			(this.IsSpecialEnergyBarEditorModeOpen = !1),
			(this.sXe = void 0),
			(this.EnvironmentPropertyList = []),
			(this.SpecialEnergyBarInfoMap = new Map()),
			(this.gU = !1),
			(this.aXe = !1);
	}
	Init() {}
	async Preload() {
		this.aXe = !0;
		const e = new CustomPromise_1.CustomPromise();
		var t = CommonParamById_1.configCommonParamById.GetStringConfig(
			"SpecialEnergyBarInfoPath",
		);
		return (
			ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.DataTable, (t) => {
				this.aXe && (this.sXe = t) && ((this.gU = !0), e.SetResult(!0));
			}),
			e.Promise
		);
	}
	OnLeaveLevel() {
		(this.gU = !1),
			(this.aXe = !1),
			(this.sXe = void 0),
			(this.EnvironmentPropertyList.length = 0),
			this.SpecialEnergyBarInfoMap.clear();
	}
	Clear() {}
	GetSpecialEnergyBarInfo(e) {
		if (this.gU) {
			let a = this.SpecialEnergyBarInfoMap.get(e);
			var t;
			return (
				a ||
					((t = DataTableUtil_1.DataTableUtil.GetDataTableRow(
						this.sXe,
						e.toString(),
					)),
					(a = new SpecialEnergyBarInfo()).Init(e, t),
					GlobalData_1.GlobalData.IsPlayInEditor) ||
					this.SpecialEnergyBarInfoMap.set(e, a),
				a
			);
		}
	}
}
exports.BattleUiSpecialEnergyBarData = BattleUiSpecialEnergyBarData;
