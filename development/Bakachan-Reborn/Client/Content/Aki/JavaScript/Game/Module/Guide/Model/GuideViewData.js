"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuideStepViewData = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../Manager/ConfigManager");
class GuideStepViewData {
	constructor(t) {
		(this._Jt = !0),
			(this.xqe = void 0),
			(this.OKt = void 0),
			(this.uJt = void 0),
			(this.cJt = void 0),
			(this.IsAttachToBattleView = !1),
			(this.mJt = void 0),
			(this.dJt = void 0),
			(this.OKt = t);
	}
	get ViewConf() {
		switch (this.OKt.Config.ContentType) {
			case 4:
				this.uJt = ConfigManager_1.ConfigManager.GuideConfig.GetGuideFocus(
					this.OKt.Id,
				);
				break;
			case 1:
				this.uJt = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTips(
					this.OKt.Id,
				);
				break;
			case 3:
				this.uJt = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorial(
					this.OKt.Id,
				);
		}
		return (
			this.uJt ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Guide",
						17,
						"引导步骤id找不到引导类型数据, 清检查配置",
						["this.Owner!.Id", this.OKt.Id],
					)),
			this.uJt
		);
	}
	GetAttachedUiItem() {
		return this.mJt;
	}
	ResetAttachedUiItem() {
		this.mJt = void 0;
	}
	GetAttachedUiItemForShow() {
		return this.dJt ?? this.mJt;
	}
	SetAttachedUiItem(t) {
		4 !== this.OKt.Config.ContentType
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Guide",
					17,
					`引导步骤 ${this.OKt.Id} 的界面类型不是聚焦引导, 无法添加依附的Ui节点`,
				)
			: (this.mJt = t);
	}
	SetAttachedUiItemForShow(t) {
		4 !== this.OKt.Config.ContentType
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Guide",
					17,
					`引导步骤 ${this.OKt.Id} 的界面类型不是聚焦引导, 无法添加依附的Ui节点(显示用)`,
				)
			: (this.dJt = t);
	}
	TryLockScrollView(t) {
		(this.xqe = t), (this._Jt = this.xqe.GetEnable()), this.xqe.SetEnable(!1);
	}
	TryUnLockScrollView() {
		this.xqe && this.xqe.SetEnable(this._Jt);
	}
	GetAttachedView() {
		return this.cJt;
	}
	SetAttachedView(t) {
		this.cJt = t;
	}
	Clear() {
		this.TryUnLockScrollView(),
			(this.cJt = void 0),
			(this.mJt = void 0),
			(this.dJt = void 0),
			(this.xqe = void 0);
	}
}
exports.GuideStepViewData = GuideStepViewData;
