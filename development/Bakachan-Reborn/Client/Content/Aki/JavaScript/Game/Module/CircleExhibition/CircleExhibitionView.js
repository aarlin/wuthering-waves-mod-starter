"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CircleExhibitionView = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	AutoAttachExhibitionView_1 = require("./AutoAttachExhibitionView");
class CircleExhibitionView extends AutoAttachExhibitionView_1.AutoAttachExhibitionView {
	CreateItems(t, i, e, o, s) {
		(this.CurrentDirection = s || 0), super.CreateItems(t, i, e, o, s);
	}
	ReloadView(t, i) {
		if (t < this.ShowItemNum)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("UiCommon", 28, "组件数据长度需要大于等于展示长度");
		else {
			this.DataLength = t;
			for (let t = 0; t < this.Items.length; t++) this.Items[t].SetActive(!1);
			for (let t = 0; t < this.ShowItemNum + 1; t++) {
				var e;
				t >= this.Items.length &&
					((e = LguiUtil_1.LguiUtil.DuplicateActor(
						this.CreateSourceActor,
						this.ItemActor,
					)),
					((e = this.CreateItemFunction(e, t, this.ShowItemNum)).InitGap =
						this.Gap),
					this.Items.push(e)),
					this.Items[t].SetActive(!0);
			}
			this.SetData(i),
				this.InitItems(),
				this.ForceUnSelectItems(),
				this.AttachToIndex(0, 0);
		}
	}
	AttachItem(t) {
		var i = void 0,
			e = void 0;
		i = this.FindNearestMiddleItem();
		if (void 0 !== (e = this.GetItems()) && void 0 !== i) {
			let o = i,
				s = 0,
				r =
					((s =
						0 === this.Direction ? i.GetItemPositionX() : i.GetItemPositionY()),
					99999);
			if (0 < t)
				for (let t = 0; t < e.length; t++) {
					let i = 0;
					(i =
						0 === this.Direction
							? e[t].GetItemPositionX()
							: e[t].GetItemPositionY()) > s &&
						i - s < r &&
						((o = e[t]), (r = i - s));
				}
			else
				for (let t = 0; t < e.length; t++) {
					let i = 0;
					(i =
						0 === this.Direction
							? e[t].GetItemPositionX()
							: e[t].GetItemPositionY()) < s &&
						s - i < r &&
						((o = e[t]), (r = s - i));
				}
			return o;
		}
	}
}
exports.CircleExhibitionView = CircleExhibitionView;
