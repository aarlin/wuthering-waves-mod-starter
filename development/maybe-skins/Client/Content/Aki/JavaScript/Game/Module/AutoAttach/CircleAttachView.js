"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CircleAttachView = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	AutoAttachBaseView_1 = require("./AutoAttachBaseView");
class CircleAttachView extends AutoAttachBaseView_1.AutoAttachBaseView {
	FindAutoAttachItem() {
		return this.FindNearestMiddleItem();
	}
	RecalculateMoveOffset(t) {
		return t;
	}
	ReloadItems(t, e) {
		if (t < this.ShowItemNum)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("UiCommon", 28, "组件数据长度需要大于等于展示长度");
		else {
			var i,
				r = this.Items.length;
			for (let t = 0; t < r; t++) this.Items[t].SetUiActive(!1);
			for (let t = 0; t < this.ShowItemNum + 1; t++)
				t >= this.Items.length &&
					((i = LguiUtil_1.LguiUtil.DuplicateActor(
						this.SourceActor,
						this.ControllerItem,
					)),
					(i = this.CreateItemFunction(i, t, this.ShowItemNum)).SetSourceView(
						this,
					),
					this.Items.push(i)),
					this.Items[t].SetItemIndex(t),
					this.Items[t].SetUiActive(!0),
					this.Items[t].SetData(e),
					this.Items[t].InitItem();
			this.RefreshItems(), this.ForceUnSelectItems(), this.AttachToIndex(0, !0);
		}
	}
	FindNextDirectionItem(t) {
		var e = this.FindNearestMiddleItem(),
			i = this.GetItems();
		if (void 0 !== i && void 0 !== e) {
			let c = e;
			var r = e.GetCurrentPosition(),
				s = i.length;
			let l = 99999;
			if (0 < t)
				for (let t = 0; t < s; t++) {
					var o = i[t].GetCurrentPosition();
					r < o && o - r < l && ((c = i[t]), (l = o - r));
				}
			else
				for (let t = 0; t < s; t++) {
					var h = i[t].GetCurrentPosition();
					h < r && r - h < l && ((c = i[t]), (l = r - h));
				}
			return c;
		}
	}
	GetIfCircle() {
		return !0;
	}
}
exports.CircleAttachView = CircleAttachView;
