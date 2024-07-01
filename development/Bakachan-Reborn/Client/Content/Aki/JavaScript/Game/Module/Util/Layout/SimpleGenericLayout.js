"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SimpleGenericLayout = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	LguiUtil_1 = require("../LguiUtil");
class SimpleGenericLayout {
	constructor(t) {
		(this.Layout = void 0),
			(this.Gqo = void 0),
			(this.g4e = []),
			(this.Nqo = 0),
			(t = (this.Layout = t).RootUIComp.GetAttachUIChild(0)) && t.IsValid()
				? ((this.Gqo = t), this.g4e.push(this.Gqo))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("UiCommon", 44, "Layout下不存在有效的子节点");
	}
	RebuildLayout(t) {
		(this.Gqo && this.Gqo.IsValid()) ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error("UiCommon", 44, "Layout下不存在有效的子节点")),
			(this.Nqo = t);
		var o = this.Layout.RootUIComp;
		for (let t = this.g4e.length; t < this.Nqo; t++) {
			var i = LguiUtil_1.LguiUtil.CopyItem(this.Gqo, o);
			this.g4e.push(i);
		}
		for (let t = 0; t < this.Nqo; t++) this.g4e[t].SetUIActive(!0);
		for (let t = this.Nqo; t < this.g4e.length; t++)
			this.g4e[t].SetUIActive(!1);
	}
	GetDisplayCount() {
		return this.Nqo;
	}
	GetItemList() {
		return this.g4e;
	}
}
exports.SimpleGenericLayout = SimpleGenericLayout;
